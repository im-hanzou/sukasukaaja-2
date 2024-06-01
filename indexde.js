const fs = require('fs'),
  fetch = require('node-fetch'),
  util = require('util'),
  readline = require('readline'),
  readFile = util.promisify(fs.readFile),
  url = 'https://api.service.gameeapp.com/',
  getRandomInt = (_0x58f4e8, _0x545101) =>
    Math.floor(Math.random() * (_0x545101 - _0x58f4e8 + 1)) + _0x58f4e8,
  getRandomRetryInterval = () => getRandomInt(10, 30) * 60 * 1000,
  getRandomNextClaimInterval = () => getRandomInt(1, 10) * 60 * 1000,
  getRandomNextSpinInterval = () => getRandomInt(1, 10) * 60 * 1000,
  delay = (_0x26de87) =>
    new Promise((_0x32220c) => setTimeout(_0x32220c, _0x26de87)),
  askQuestion = (_0x3393f1) => {
    const _0x50e214 = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    return new Promise((_0x26a9a1) =>
      _0x50e214.question(_0x3393f1, (_0x40b2ba) => {
        _0x50e214.close()
        _0x26a9a1(_0x40b2ba.toLowerCase())
      })
    )
  },
  claimMiningEvent = async (
    _0x50e0bb,
    _0x3f7aeb,
    _0x5368bc,
    _0xd54efa,
    _0x210680
  ) => {
    try {
      const _0xaf19e = {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          authorization: 'Bearer ' + _0x50e0bb,
          'client-language': 'en',
          'content-type': 'text/plain;charset=UTF-8',
          priority: 'u=1, i',
          'sec-ch-ua':
            '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99", "Microsoft Edge WebView2";v="124"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          Referer: 'https://prizes.gamee.com/',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        _0x144b73 = JSON.stringify({
          jsonrpc: '2.0',
          id: 'miningEvent.startSession',
          method: 'miningEvent.startSession',
          params: { miningEventId: 6 },
        }),
        _0x39b899 = await fetch(url, {
          method: 'POST',
          headers: _0xaf19e,
          body: _0x144b73,
        }),
        _0x274db4 = await _0x39b899.json()
      if (_0x274db4.error) {
        if (_0x274db4.error.message === 'Mining session in progress.') {
          console.error(
            'Mining session in progress for ' +
              _0x3f7aeb +
              ' ' +
              _0x5368bc +
              '. Checking for spins...'
          )
          await claimDailyReward(
            _0x50e0bb,
            _0x3f7aeb,
            _0x5368bc,
            _0xd54efa,
            _0x210680,
            true
          )
          const _0x41fd6c = getRandomRetryInterval()
          console.error(
            'Retrying mining session in ' +
              (_0x41fd6c / 60000).toFixed(2) +
              ' minutes...'
          )
          setTimeout(
            () =>
              claimMiningEvent(
                _0x50e0bb,
                _0x3f7aeb,
                _0x5368bc,
                _0xd54efa,
                _0x210680
              ),
            _0x41fd6c
          )
        } else {
          _0x274db4.error.message === 'Unauthorized'
            ? (console.error(
                'Error for ' +
                  _0x3f7aeb +
                  ' ' +
                  _0x5368bc +
                  ': Unauthorized. Retrying authentication and claim in 1 minute...'
              ),
              setTimeout(
                () => authenticateUser(_0xd54efa, _0x210680, 'y', 'y', 'y'),
                60000
              ))
            : console.error(
                'Error for ' + _0x3f7aeb + ' ' + _0x5368bc + ':',
                _0x274db4.error.message
              )
        }
        return
      }
      if (
        _0x274db4.result &&
        _0x274db4.result.miningEvent &&
        _0x274db4.result.miningEvent.miningUser
      ) {
        const _0x19a424 =
            _0x274db4.result.miningEvent.miningUser.currentSessionMicroToken,
          _0x1ae7f8 =
            _0x274db4.result.miningEvent.miningUser.currentSpeedMicroToken,
          _0xcfaea3 = (_0x19a424 / _0x1ae7f8) * 60 + getRandomInt(1, 10),
          _0x29f3b7 = _0xcfaea3 * 60 * 1000
        console.log(
          'Sukses claim untuk ' +
            _0x3f7aeb +
            ' ' +
            _0x5368bc +
            ', next claim in ' +
            _0xcfaea3.toFixed(2) +
            ' minutes.'
        )
        const _0x104af8 = _0x274db4.result.tokens
          ? _0x274db4.result.tokens.authenticate
          : _0x50e0bb
        await claimDailyReward(
          _0x104af8,
          _0x3f7aeb,
          _0x5368bc,
          _0xd54efa,
          _0x210680,
          false
        )
        setTimeout(
          () =>
            claimMiningEvent(
              _0x104af8,
              _0x3f7aeb,
              _0x5368bc,
              _0xd54efa,
              _0x210680
            ),
          _0x29f3b7
        )
      } else {
        console.error(
          'Unexpected response for ' + _0x3f7aeb + ' ' + _0x5368bc + ':',
          _0x274db4
        )
      }
    } catch (_0x16f5ca) {
      console.error('Error for ' + _0x3f7aeb + ' ' + _0x5368bc + ':', _0x16f5ca)
      _0x16f5ca.type === 'system' &&
        _0x16f5ca.code === 'ECONNRESET' &&
        (console.error(
          'Connection reset for ' +
            _0x3f7aeb +
            ' ' +
            _0x5368bc +
            '. Retrying in 1 minute...'
        ),
        setTimeout(
          () =>
            claimMiningEvent(
              _0x50e0bb,
              _0x3f7aeb,
              _0x5368bc,
              _0xd54efa,
              _0x210680
            ),
          60000
        ))
    }
  },
  claimDailyReward = async (
    _0x3368e9,
    _0x49ee56,
    _0x3652b2,
    _0x1e00ae,
    _0x426054,
    _0x5da9c2
  ) => {
    try {
      const _0x42bc82 = {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          authorization: 'Bearer ' + _0x3368e9,
          'client-language': 'en',
          'content-type': 'text/plain;charset=UTF-8',
          priority: 'u=1, i',
          'sec-ch-ua':
            '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99", "Microsoft Edge WebView2";v="124"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'x-install-uuid': _0x426054,
          Referer: 'https://prizes.gamee.com/',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        _0x1a05f0 = JSON.stringify({
          jsonrpc: '2.0',
          id: 'dailyReward.getPrizes',
          method: 'dailyReward.getPrizes',
          params: {},
        }),
        _0x34e70a = await fetch(url, {
          method: 'POST',
          headers: _0x42bc82,
          body: _0x1a05f0,
        }),
        _0xab1057 = await _0x34e70a.json()
      if (_0xab1057.error) {
        _0xab1057.error.message === 'Unauthorized'
          ? (console.error(
              'Error for ' +
                _0x49ee56 +
                ' ' +
                _0x3652b2 +
                ': Unauthorized. Retrying authentication and claim in 1 minute...'
            ),
            setTimeout(
              () => authenticateUser(_0x1e00ae, _0x426054, 'y', 'y', 'y'),
              60000
            ))
          : console.error(
              'Error for ' + _0x49ee56 + ' ' + _0x3652b2 + ':',
              _0xab1057.error.message
            )
        return
      }
      if (_0xab1057.result && _0xab1057.result.dailyReward) {
        const _0x2c3fcf = _0xab1057.result.dailyReward.spinsCountAvailable,
          _0x591356 = new Date(
            _0xab1057.result.dailyReward.nextStreakDayTimestamp
          ).getTime()
        if (_0x2c3fcf > 0) {
          await performSpin(
            _0x3368e9,
            _0x49ee56,
            _0x3652b2,
            _0x1e00ae,
            _0x426054,
            _0x2c3fcf,
            _0x591356
          )
        } else {
          if (_0x5da9c2) {
            const _0x25f60c =
              _0x591356 + getRandomNextSpinInterval() - Date.now()
            setTimeout(
              () =>
                claimDailyReward(
                  _0x3368e9,
                  _0x49ee56,
                  _0x3652b2,
                  _0x1e00ae,
                  _0x426054,
                  false
                ),
              _0x25f60c
            )
          }
        }
      } else {
        console.error(
          'Unexpected response for ' + _0x49ee56 + ' ' + _0x3652b2 + ':',
          _0xab1057
        )
      }
    } catch (_0xca9354) {
      console.error('Error for ' + _0x49ee56 + ' ' + _0x3652b2 + ':', _0xca9354)
      _0xca9354.type === 'system' &&
        _0xca9354.code === 'ECONNRESET' &&
        (console.error(
          'Connection reset for ' +
            _0x49ee56 +
            ' ' +
            _0x3652b2 +
            '. Retrying in 1 minute...'
        ),
        setTimeout(
          () =>
            claimDailyReward(
              _0x3368e9,
              _0x49ee56,
              _0x3652b2,
              _0x1e00ae,
              _0x426054,
              _0x5da9c2
            ),
          60000
        ))
    }
  },
  performSpin = async (
    _0x3f54f8,
    _0x1daf17,
    _0x312b94,
    _0x296ecb,
    _0x3be192,
    _0x48c548,
    _0x405d99
  ) => {
    try {
      const _0x1332fa = {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          authorization: 'Bearer ' + _0x3f54f8,
          'client-language': 'en',
          'content-type': 'text/plain;charset=UTF-8',
          priority: 'u=1, i',
          'sec-ch-ua':
            '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99", "Microsoft Edge WebView2";v="124"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'x-install-uuid': _0x3be192,
          Referer: 'https://prizes.gamee.com/',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        _0x35266b = JSON.stringify([
          {
            jsonrpc: '2.0',
            id: 'dailyReward.claimPrize',
            method: 'dailyReward.claimPrize',
            params: {},
          },
          {
            jsonrpc: '2.0',
            id: 'dailyReward.getPrizes',
            method: 'dailyReward.getPrizes',
            params: {},
          },
        ])
      let _0x380741 = false
      for (let _0x2b14e3 = 0; _0x2b14e3 < _0x48c548; _0x2b14e3++) {
        const _0x409926 = await fetch(url, {
            method: 'POST',
            headers: _0x1332fa,
            body: _0x35266b,
          }),
          _0x5ee3ca = await _0x409926.json()
        if (_0x5ee3ca[0].error) {
          if (_0x5ee3ca[0].error.message === 'No spins available') {
            console.error(
              'No spins available for ' +
                _0x1daf17 +
                ' ' +
                _0x312b94 +
                '. Checking for spins...'
            )
            await claimDailyReward(
              _0x3f54f8,
              _0x1daf17,
              _0x312b94,
              _0x296ecb,
              _0x3be192,
              false
            )
            return
          } else {
            console.error(
              'Error during spin for ' + _0x1daf17 + ' ' + _0x312b94 + ':',
              _0x5ee3ca[0].error.message
            )
            _0x5ee3ca[0].error.message === 'Unauthorized' &&
              (console.error(
                'Error for ' +
                  _0x1daf17 +
                  ' ' +
                  _0x312b94 +
                  ': Unauthorized. Retrying authentication and claim in 1 minute...'
              ),
              setTimeout(
                () => authenticateUser(_0x296ecb, _0x3be192, 'y', 'y', 'y'),
                60000
              ))
            return
          }
        }
        _0x380741 = true
        console.log('Done spin for ' + _0x1daf17 + ' ' + _0x312b94)
        _0x2b14e3 < _0x48c548 - 1 && (await delay(10000))
      }
      if (_0x380741) {
        const _0x3f6163 = _0x405d99 + getRandomNextSpinInterval() - Date.now()
        console.log(
          'Next spin for ' +
            _0x1daf17 +
            ' ' +
            _0x312b94 +
            ' in ' +
            (_0x3f6163 / 60000).toFixed(2) +
            ' minutes.'
        )
        setTimeout(
          () =>
            claimDailyReward(
              _0x3f54f8,
              _0x1daf17,
              _0x312b94,
              _0x296ecb,
              _0x3be192,
              false
            ),
          _0x3f6163
        )
      }
    } catch (_0x210fa9) {
      console.error(
        'Error during spin for ' + _0x1daf17 + ' ' + _0x312b94 + ':',
        _0x210fa9
      )
      _0x210fa9.type === 'system' &&
        _0x210fa9.code === 'ECONNRESET' &&
        (console.error(
          'Connection reset for ' +
            _0x1daf17 +
            ' ' +
            _0x312b94 +
            '. Retrying in 1 minute...'
        ),
        setTimeout(
          () =>
            performSpin(
              _0x3f54f8,
              _0x1daf17,
              _0x312b94,
              _0x296ecb,
              _0x3be192,
              _0x48c548,
              _0x405d99
            ),
          60000
        ))
    }
  },
  performUpgrade = async (
    _0x530aba,
    _0x171352,
    _0x477f0f,
    _0x191513,
    _0x4cb7d4
  ) => {
    try {
      const _0xc0ed06 = {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          authorization: 'Bearer ' + _0x530aba,
          'client-language': 'en',
          'content-type': 'text/plain;charset=UTF-8',
          priority: 'u=1, i',
          'sec-ch-ua':
            '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99", "Microsoft Edge WebView2";v="124"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'x-install-uuid': _0x191513,
          Referer: 'https://prizes.gamee.com/',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        _0x59224a = JSON.stringify({
          jsonrpc: '2.0',
          id: 'miningEvent.upgrade',
          method: 'miningEvent.upgrade',
          params: {
            miningEventId: 6,
            upgrade: 'storage',
          },
        }),
        _0x3948c9 = await fetch(url, {
          method: 'POST',
          headers: _0xc0ed06,
          body: _0x59224a,
        }),
        _0x2b91af = await _0x3948c9.json()
      if (_0x2b91af.error) {
        if (_0x2b91af.error.message === 'Not enough assets.') {
          console.log(
            'Done upgrade mining cap for ' + _0x171352 + ' ' + _0x477f0f + '.'
          )
          return
        } else {
          _0x2b91af.error.message === 'Unauthorized'
            ? (console.error(
                'Error for ' +
                  _0x171352 +
                  ' ' +
                  _0x477f0f +
                  ': Unauthorized. Retrying authentication and upgrade in 1 minute...'
              ),
              setTimeout(
                () => authenticateUser(_0x4cb7d4, _0x191513, 'n', 'n', 'y'),
                60000
              ))
            : console.error(
                'Error for ' + _0x171352 + ' ' + _0x477f0f + ':',
                _0x2b91af.error.message
              )
        }
      } else {
        console.log(
          'Upgraded mining cap for ' +
            _0x171352 +
            ' ' +
            _0x477f0f +
            '. Retrying in 20 seconds...'
        )
        setTimeout(
          () =>
            performUpgrade(
              _0x530aba,
              _0x171352,
              _0x477f0f,
              _0x191513,
              _0x4cb7d4
            ),
          20000
        )
      }
    } catch (_0x408f52) {
      console.error(
        'Error during upgrade for ' + _0x171352 + ' ' + _0x477f0f + ':',
        _0x408f52
      )
      _0x408f52.type === 'system' &&
        _0x408f52.code === 'ECONNRESET' &&
        (console.error(
          'Connection reset for ' +
            _0x171352 +
            ' ' +
            _0x477f0f +
            '. Retrying in 1 minute...'
        ),
        setTimeout(
          () =>
            performUpgrade(
              _0x530aba,
              _0x171352,
              _0x477f0f,
              _0x191513,
              _0x4cb7d4
            ),
          60000
        ))
    }
  },
  authenticateUser = async (
    _0x25230f,
    _0x1c7fa8,
    _0x133423,
    _0x3d5fc1,
    _0x52b117
  ) => {
    try {
      console.log(
        '======================================================================'
      )
      console.log('Login with : ' + _0x1c7fa8)
      const _0x3de059 = {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'client-language': 'en',
          'content-type': 'text/plain;charset=UTF-8',
          priority: 'u=1, i',
          'sec-ch-ua':
            '"Chromium";v="124", "Microsoft Edge";v="124", "Not-A.Brand";v="99", "Microsoft Edge WebView2";v="124"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'x-install-uuid': _0x1c7fa8.trim(),
          Referer: 'https://prizes.gamee.com/',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        _0x5c84c0 = JSON.stringify({
          jsonrpc: '2.0',
          id: 'user.authentication.loginUsingTelegram',
          method: 'user.authentication.loginUsingTelegram',
          params: { initData: _0x25230f.trim() },
        }),
        _0x5bf4f0 = await fetch(url, {
          method: 'POST',
          headers: _0x3de059,
          body: _0x5c84c0,
        }),
        _0x381e10 = await _0x5bf4f0.json()
      if (
        _0x381e10.result &&
        _0x381e10.result.tokens &&
        _0x381e10.result.tokens.authenticate
      ) {
        const _0x2f2353 = _0x381e10.result.tokens.authenticate
        let _0x2fded8 = 'Unknown',
          _0xf80fb9 = 'User'
        _0x381e10.result.user &&
          _0x381e10.result.user.personal &&
          ((_0x2fded8 = _0x381e10.result.user.personal.firstname || _0x2fded8),
          (_0xf80fb9 = _0x381e10.result.user.personal.lastname || _0xf80fb9))
        console.log('Name Telegram : ' + _0x2fded8 + ' ' + _0xf80fb9)
        _0x133423 === 'y' &&
          (await claimMiningEvent(
            _0x2f2353,
            _0x2fded8,
            _0xf80fb9,
            _0x25230f,
            _0x1c7fa8
          ))
        _0x3d5fc1 === 'y' &&
          (await claimDailyReward(
            _0x2f2353,
            _0x2fded8,
            _0xf80fb9,
            _0x25230f,
            _0x1c7fa8,
            true
          ))
        _0x52b117 === 'y' &&
          (await performUpgrade(
            _0x2f2353,
            _0x2fded8,
            _0xf80fb9,
            _0x1c7fa8,
            _0x25230f
          ))
      } else {
        console.error('Authentication failed:', _0x381e10)
      }
    } catch (_0x19f352) {
      console.error('Error:', _0x19f352)
    }
  },
  main = async () => {
    try {
      const _0x48e35a = await readFile('loot.txt', 'utf8'),
        _0x29d227 = _0x48e35a.trim().split('\n')
      console.log(
        '======================================================================'
      )
      const _0x331314 = await askQuestion('Auto claim ? (y / n) : '),
        _0x270615 = await askQuestion('Auto spin ? (y / n) : '),
        _0x483afd = await askQuestion('Auto upgrade ? (y / n) : ')
      for (const _0x26324c of _0x29d227) {
        const [_0x34436b, _0xd20eb1] = _0x26324c
          .split('|')
          .map((_0x71fc50) => _0x71fc50.trim())
        _0x34436b && _0xd20eb1
          ? (await authenticateUser(
              _0x34436b,
              _0xd20eb1,
              _0x331314,
              _0x270615,
              _0x483afd
            ),
            await delay(3000))
          : console.error('Invalid entry:', _0x26324c)
      }
    } catch (_0x4a9b5a) {
      console.error('Error:', _0x4a9b5a)
    }
  }
main()
