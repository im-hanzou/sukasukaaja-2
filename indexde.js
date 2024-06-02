const fs = require('fs');
const fetch = require('node-fetch');
const util = require('util');
const readline = require('readline');

const readFile = util.promisify(fs.readFile);
const url = 'https://api.service.gameeapp.com/';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomRetryInterval = () => getRandomInt(10, 30) * 60 * 1000;
const getRandomNextClaimInterval = () => getRandomInt(1, 10) * 60 * 1000;
const getRandomNextSpinInterval = () => getRandomInt(1, 10) * 60 * 1000;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const askQuestion = question => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise(resolve => rl.question(question, answer => {
    rl.close();
    resolve(answer.toLowerCase());
  }));
};

const authenticateUser = async (initData, installUUID, claimMining = 'n', claimDaily = 'n', upgrade = 'n') => {
  try {
    console.log('======================================================================');
    console.log('Login with UUID: ' + installUUID);
    const headers = {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'client-language': 'en',
      'content-type': 'text/plain;charset=UTF-8',
      'x-install-uuid': installUUID.trim(),
      'Referer': 'https://prizes.gamee.com/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 'user.authentication.loginUsingTelegram',
      method: 'user.authentication.loginUsingTelegram',
      params: { initData: initData.trim() },
    });
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });
    const data = await response.json();
    
    if (data.result && data.result.tokens && data.result.tokens.authenticate) {
      const token = data.result.tokens.authenticate;
      let firstname = 'Unknown', lastname = 'User';
      
      if (data.result.user && data.result.user.personal) {
        firstname = data.result.user.personal.firstname || firstname;
        lastname = data.result.user.personal.lastname || lastname;
      }

      console.log('Name Telegram: ' + firstname + ' ' + lastname);
      
      if (claimMining === 'y') {
        await claimMiningEvent(token, firstname, lastname, initData, installUUID);
      }
      
      if (claimDaily === 'y') {
        await claimDailyReward(token, firstname, lastname, initData, installUUID, false);
      }
      
      if (upgrade === 'y') {
        await performUpgrade(token, firstname, lastname, initData, installUUID);
      }
    }
  } catch (error) {
    console.error('Authentication error: ', error);
  }
};

const claimMiningEvent = async (token, firstname, lastname, initData, installUUID) => {
  try {
    const headers = {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'authorization': 'Bearer ' + token,
      'client-language': 'en',
      'content-type': 'text/plain;charset=UTF-8',
      'Referer': 'https://prizes.gamee.com/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 'miningEvent.startSession',
      method: 'miningEvent.startSession',
      params: { miningEventId: 6 },
    });
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });
    const data = await response.json();

    if (data.error) {
      handleMiningError(data, token, firstname, lastname, initData, installUUID);
      return;
    }

    if (data.result && data.result.miningEvent && data.result.miningEvent.miningUser) {
      const sessionToken = data.result.miningEvent.miningUser.currentSessionMicroToken;
      const speedToken = data.result.miningEvent.miningUser.currentSpeedMicroToken;
      const nextClaimTime = (sessionToken / speedToken) * 60 + getRandomInt(1, 10);
      const nextClaimInterval = nextClaimTime * 60 * 1000;
      
      console.log(`Success claim for ${firstname} ${lastname}, next claim in ${nextClaimTime.toFixed(2)} minutes.`);
      
      setTimeout(() => claimMiningEvent(token, firstname, lastname, initData, installUUID), nextClaimInterval);
    } else {
      console.error('Unexpected response:', data);
    }
  } catch (error) {
    console.error(`Error for ${firstname} ${lastname}:`, error);
    if (error.type === 'system' && error.code === 'ECONNRESET') {
      console.error(`Connection reset for ${firstname} ${lastname}. Retrying in 1 minute...`);
      setTimeout(() => claimMiningEvent(token, firstname, lastname, initData, installUUID), 60000);
    }
  }
};

const handleMiningError = (data, token, firstname, lastname, initData, installUUID) => {
  if (data.error.message === 'Mining session in progress.') {
    console.error(`Mining session in progress for ${firstname} ${lastname}. Checking for spins...`);
    claimDailyReward(token, firstname, lastname, initData, installUUID, true);
    const retryInterval = getRandomRetryInterval();
    console.error(`Retrying mining session in ${(retryInterval / 60000).toFixed(2)} minutes...`);
    setTimeout(() => claimMiningEvent(token, firstname, lastname, initData, installUUID), retryInterval);
  } else if (data.error.message === 'Unauthorized') {
    console.error(`Unauthorized error for ${firstname} ${lastname}. Retrying authentication in 1 minute...`);
    setTimeout(() => authenticateUser(initData, installUUID, 'y', 'y', 'y'), 60000);
  } else {
    console.error(`Error for ${firstname} ${lastname}:`, data.error.message);
  }
};

const claimDailyReward = async (token, firstname, lastname, initData, installUUID, retryOnSpins) => {
  try {
    const headers = {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'authorization': 'Bearer ' + token,
      'client-language': 'en',
      'content-type': 'text/plain;charset=UTF-8',
      'x-install-uuid': installUUID,
      'Referer': 'https://prizes.gamee.com/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 'dailyReward.getPrizes',
      method: 'dailyReward.getPrizes',
      params: {},
    });
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });
    const data = await response.json();

    if (data.error) {
      handleDailyRewardError(data, token, firstname, lastname, initData, installUUID, retryOnSpins);
      return;
    }

    if (data.result && data.result.dailyReward) {
      const spinsCount = data.result.dailyReward.spinsCountAvailable;
      const nextStreakTime = new Date(data.result.dailyReward.nextStreakDayTimestamp).getTime();
      
      if (spinsCount > 0) {
        await performSpin(token, firstname, lastname, initData, installUUID, spinsCount, nextStreakTime);
      } else if (retryOnSpins) {
        const nextSpinInterval = nextStreakTime + getRandomNextSpinInterval() - Date.now();
        setTimeout(() => claimDailyReward(token, firstname, lastname, initData, installUUID, false), nextSpinInterval);
      }
    } else {
      console.error('Unexpected response:', data);
    }
  } catch (error) {
    console.error(`Error for ${firstname} ${lastname}:`, error);
    if (error.type === 'system' && error.code === 'ECONNRESET') {
      console.error(`Connection reset for ${firstname} ${lastname}. Retrying in 1 minute...`);
      setTimeout(() => claimDailyReward(token, firstname, lastname, initData, installUUID, retryOnSpins), 60000);
    }
  }
};

const handleDailyRewardError = (data, token, firstname, lastname, initData, installUUID, retryOnSpins) => {
  if (data.error.message === 'Unauthorized') {
    console.error(`Unauthorized error for ${firstname} ${lastname}. Retrying authentication in 1 minute...`);
    setTimeout(() => authenticateUser(initData, installUUID, 'y', 'y', 'y'), 60000);
  } else {
    console.error(`Error for ${firstname} ${lastname}:`, data.error.message);
  }
};

const performSpin = async (token, firstname, lastname, initData, installUUID, spinsCount, nextStreakTime) => {
  try {
    const headers = {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'authorization': 'Bearer ' + token,
      'client-language': 'en',
      'content-type': 'text/plain;charset=UTF-8',
      'x-install-uuid': installUUID,
      'Referer': 'https://prizes.gamee.com/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 'dailyReward.performSpin',
      method: 'dailyReward.performSpin',
      params: {},
    });
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });
    const data = await response.json();

    if (data.error) {
      console.error(`Spin error for ${firstname} ${lastname}:`, data.error.message);
      return;
    }

    console.log(`Spin result for ${firstname} ${lastname}:`, data.result);

    if (--spinsCount > 0) {
      const nextSpinInterval = getRandomNextSpinInterval();
      setTimeout(() => performSpin(token, firstname, lastname, initData, installUUID, spinsCount, nextStreakTime), nextSpinInterval);
    } else {
      const nextClaimInterval = nextStreakTime + getRandomNextClaimInterval() - Date.now();
      setTimeout(() => claimDailyReward(token, firstname, lastname, initData, installUUID, false), nextClaimInterval);
    }
  } catch (error) {
    console.error(`Error for ${firstname} ${lastname}:`, error);
    if (error.type === 'system' && error.code === 'ECONNRESET') {
      console.error(`Connection reset for ${firstname} ${lastname}. Retrying in 1 minute...`);
      setTimeout(() => performSpin(token, firstname, lastname, initData, installUUID, spinsCount, nextStreakTime), 60000);
    }
  }
};

const performUpgrade = async (token, firstname, lastname, initData, installUUID) => {
  try {
    const headers = {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'authorization': 'Bearer ' + token,
      'client-language': 'en',
      'content-type': 'text/plain;charset=UTF-8',
      'Referer': 'https://prizes.gamee.com/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 'miningEvent.upgradeMiningSpeed',
      method: 'miningEvent.upgradeMiningSpeed',
      params: { miningEventId: 6 },
    });
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });
    const data = await response.json();

    if (data.error) {
      console.error(`Upgrade error for ${firstname} ${lastname}:`, data.error.message);
      return;
    }

    console.log(`Upgrade successful for ${firstname} ${lastname}:`, data.result);
  } catch (error) {
    console.error(`Error for ${firstname} ${lastname}:`, error);
  }
};

// Example usage:
const main = async () => {
  const initData = await askQuestion('Enter init data: ');
  const installUUID = await askQuestion('Enter install UUID: ');
  const claimMining = await askQuestion('Claim mining event? (y/n): ');
  const claimDaily = await askQuestion('Claim daily reward? (y/n): ');
  const upgrade = await askQuestion('Perform upgrade? (y/n): ');

  await authenticateUser(initData, installUUID, claimMining, claimDaily, upgrade);
};

main();
