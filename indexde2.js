// Required modules
const fs = require('fs');
const fetch = require('node-fetch');
const util = require('util');
const readline = require('readline');

// Promisify readFile
const readFile = util.promisify(fs.readFile);

// API URL
const apiUrl = "https://api.service.gameeapp.com/";

// Utility functions
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomRetryInterval = () => getRandomInt(10, 30) * 60 * 1000;
const getRandomNextInterval = () => getRandomInt(1, 10) * 60 * 1000;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to ask a question via the console
const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => rl.question(query, answer => {
    rl.close();
    resolve(answer.toLowerCase());
  }));
};

// Function to claim mining ended rewards
const claimMiningEnded = async (authToken, username, userId) => {
  try {
    const headers = {
      accept: 'application/json',
      'accept-language': 'en',
      authorization: `Bearer ${authToken}`,
      'client-language': 'en',
      'content-type': 'text/plain;charset=UTF-8',
      priority: 'u=1, i',
      'sec-ch-ua': '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99", "Microsoft Edge WebView2";v="124"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      Referer: 'https://example.com',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };

    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: "mining_ended_claim",
      method: "getRewards",
      params: { filter: "all", pagination: { offset: 0, limit: 100 } }
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body
    });

    const data = await response.json();

    if (data.result && data.result.activities) {
      const unclaimedRewards = data.result.activities.filter(activity => activity.type === 'mining_ended_claim' && !activity.isClaimed);
      
      if (unclaimedRewards.length === 0) {
        console.log(`No unclaimed rewards for ${username} ${userId}`);
        return;
      }

      for (const reward of unclaimedRewards) {
        const claimBody = JSON.stringify({
          jsonrpc: "2.0",
          id: "user.claimActivity",
          method: "user.claimActivity",
          params: { activityId: reward.id }
        });

        await fetch(apiUrl, {
          method: 'POST',
          headers,
          body: claimBody
        });

        console.log(`Claimed reward for ${username} ${userId}: ${reward.id}`);
        await delay(10000); // Wait 10 seconds before next claim
      }
    } else {
      console.error(`Error fetching activities for ${username} ${userId}:`, data);
    }
  } catch (error) {
    console.error(`Error for ${username} ${userId}:`, error);
  }
};

// Function to claim mining event
const claimMiningEvent = async (authToken, username, userId, sessionId, installUuid) => {
  try {
    const headers = {
      accept: 'application/json',
      'accept-language': 'en',
      authorization: `Bearer ${authToken}`,
      'client-language': 'en',
      'content-type': 'text/plain;charset=UTF-8',
      priority: 'u=1, i',
      'sec-ch-ua': '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99", "Microsoft Edge WebView2";v="124"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      Referer: 'https://example.com',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };

    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: "miningEvent.startSession",
      method: "startMiningSession",
      params: { miningEventId: 7 }
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body
    });

    const data = await response.json();

    if (data.result && data.result.miningUser) {
      const miningTimeLeft = data.result.miningEvent.timeLeft;
      const miningInterval = data.result.miningUser.miningInterval;
      const nextClaimTime = miningTimeLeft / miningInterval * 60 + getRandomInt(1, 10);
      const nextClaimMs = nextClaimTime * 60 * 1000;

      console.log(`Successfully started mining for ${username} ${userId}. Next claim in ${nextClaimTime.toFixed(2)} minutes.`);
      await claimDailyReward(authToken, username, userId, sessionId, installUuid, false);

      setTimeout(() => claimMiningEvent(authToken, username, userId, sessionId, installUuid), nextClaimMs);
    } else {
      console.error(`Unexpected response for ${username} ${userId}:`, data);
    }
  } catch (error) {
    console.error(`Error for ${username} ${userId}:`, error);
  }
};

// Function to claim daily reward
const claimDailyReward = async (authToken, username, userId, sessionId, installUuid, retry) => {
  try {
    const headers = {
      accept: 'application/json',
      'accept-language': 'en',
      authorization: `Bearer ${authToken}`,
      'client-language': 'en',
      'content-type': 'text/plain;charset=UTF-8',
      priority: 'u=1, i',
      'sec-ch-ua': '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99", "Microsoft Edge WebView2";v="124"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'x-install-uuid': installUuid,
      Referer: 'https://example.com',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };

    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: "dailyReward",
      method: "claimDailyReward",
      params: {}
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body
    });

    const data = await response.json();

    if (data.result && data.result.dailyReward) {
      const spinCount = data.result.dailyReward.spinsAvailable;
      const spinTime = new Date(data.result.dailyReward.spinTime).getTime();

      if (spinCount > 0) {
        await performSpin(authToken, username, userId, sessionId, installUuid, spinCount, spinTime);
      } else if (retry) {
        const nextSpinInterval = spinTime + getRandomNextInterval() - Date.now();
        console.log(`Next spin for ${username} ${userId} in ${(nextSpinInterval / 60000).toFixed(2)} minutes.`);
        setTimeout(() => claimDailyReward(authToken, username, userId, sessionId, installUuid, false), nextSpinInterval);
      }
    } else {
      console.error(`Error fetching daily reward for ${username} ${userId}:`, data);
    }
  } catch (error) {
    console.error(`Error for ${username} ${userId}:`, error);
  }
};

// Function to perform spin
const performSpin = async (authToken, username, userId, sessionId, installUuid, spinCount, spinTime) => {
  try {
    const headers = {
      accept: '*/*',
      'accept-language': 'en',
      authorization: `Bearer ${authToken}`,
      'client-language': 'en',
      'content-type': 'text/plain;charset=UTF-8',
      priority: 'u=1, i',
      'sec-ch-ua': '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99", "Microsoft Edge WebView2";v="124"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'x-install-uuid': installUuid,
      Referer: 'https://example.com',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    };

    for (let i = 0; i < spinCount; i++) {
      const body = JSON.stringify({
        jsonrpc: "2.0",
        id: `spin${i}`,
        method: "spinWheel",
        params: {}
      });

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body
      });

      const data = await response.json();
      console.log(`Spin result for ${username} ${userId}:`, data);
      await delay(5000); // Wait 5 seconds between spins
    }
  } catch (error) {
    console.error(`Error for ${username} ${userId} during spin:`, error);
  }
};

// Main function to handle all users
const main = async () => {
  try {
    const accounts = await readFile('accounts.json', 'utf8');
    const userAccounts = JSON.parse(accounts);

    for (const account of userAccounts) {
      const { authToken, username, userId, sessionId, installUuid } = account;
      await claimMiningEnded(authToken, username, userId);
      await claimMiningEvent(authToken, username, userId, sessionId, installUuid);
    }
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

// Start the main function
main();
