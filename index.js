const _0x2bf73b=_0x5913;(function(_0x1672a2,_0x12463a){const _0x2321cd=_0x5913,_0x1da9c2=_0x1672a2();while(!![]){try{const _0x103d49=-parseInt(_0x2321cd(0xcf))/0x1*(parseInt(_0x2321cd(0xb0))/0x2)+parseInt(_0x2321cd(0x8d))/0x3*(parseInt(_0x2321cd(0xa2))/0x4)+parseInt(_0x2321cd(0xe4))/0x5*(parseInt(_0x2321cd(0xb2))/0x6)+parseInt(_0x2321cd(0x87))/0x7+-parseInt(_0x2321cd(0xe6))/0x8*(parseInt(_0x2321cd(0xd6))/0x9)+-parseInt(_0x2321cd(0x8a))/0xa+-parseInt(_0x2321cd(0xcc))/0xb*(-parseInt(_0x2321cd(0xa5))/0xc);if(_0x103d49===_0x12463a)break;else _0x1da9c2['push'](_0x1da9c2['shift']());}catch(_0x160b4a){_0x1da9c2['push'](_0x1da9c2['shift']());}}}(_0x24c9,0x59f49));const fs=require('fs'),fetch=require('node-fetch'),util=require(_0x2bf73b(0xe9)),readline=require(_0x2bf73b(0x9f)),readFile=util[_0x2bf73b(0xa6)](fs[_0x2bf73b(0xc5)]),url='https://api.service.gameeapp.com/',getRandomInt=(_0xec509f,_0x5f241d)=>Math['floor'](Math['random']()*(_0x5f241d-_0xec509f+0x1))+_0xec509f,getRandomRetryInterval=()=>getRandomInt(0xa,0x1e)*0x3c*0x3e8,getRandomNextClaimInterval=()=>getRandomInt(0x1,0xa)*0x3c*0x3e8,getRandomNextSpinInterval=()=>getRandomInt(0x1,0xa)*0x3c*0x3e8,delay=_0x4516ff=>new Promise(_0x4bc1f4=>setTimeout(_0x4bc1f4,_0x4516ff)),askQuestion=_0x60a633=>{const _0x35c3fa=_0x2bf73b,_0x1ac2b0=readline['createInterface']({'input':process[_0x35c3fa(0xd4)],'output':process['stdout']});return new Promise(_0x5e3c70=>_0x1ac2b0[_0x35c3fa(0xcb)](_0x60a633,_0x2d9e76=>{const _0x5a3db9=_0x35c3fa;_0x1ac2b0[_0x5a3db9(0x99)](),_0x5e3c70(_0x2d9e76['toLowerCase']());}));},claimMiningEnded=async(_0x1344fe,_0x39934c,_0x4f8f0b)=>{const _0x396157=_0x2bf73b;try{const _0x27fddc={'accept':_0x396157(0x8e),'accept-language':_0x396157(0xc1),'authorization':_0x396157(0xc2)+_0x1344fe,'client-language':'en','content-type':'text/plain;charset=UTF-8','priority':_0x396157(0xd9),'sec-ch-ua':_0x396157(0xce),'sec-ch-ua-mobile':'?0','sec-ch-ua-platform':'\x22Windows\x22','sec-fetch-dest':'empty','sec-fetch-mode':_0x396157(0xe5),'sec-fetch-site':_0x396157(0xb9),'Referer':_0x396157(0xc9),'Referrer-Policy':_0x396157(0xa4)},_0x557bd3=JSON[_0x396157(0xca)]({'jsonrpc':_0x396157(0xcd),'id':_0x396157(0x88),'method':_0x396157(0x88),'params':{'filter':'all','pagination':{'offset':0x0,'limit':0x64}}}),_0x44ba11=await fetch(url,{'method':_0x396157(0xc7),'headers':_0x27fddc,'body':_0x557bd3}),_0x5c535b=await _0x44ba11['json']();if(_0x5c535b[_0x396157(0x9e)]&&_0x5c535b[_0x396157(0x9e)][_0x396157(0xa1)]){const _0x3184c0=_0x5c535b[_0x396157(0x9e)][_0x396157(0xa1)]['filter'](_0x51d5d4=>_0x51d5d4[_0x396157(0xc8)]==='mining_ended_claim'&&!_0x51d5d4['isClaimed']);if(_0x3184c0[_0x396157(0xdb)]===0x0){console[_0x396157(0xaa)](_0x396157(0x8c)+_0x39934c+'\x20'+_0x4f8f0b);return;}for(const _0x3ac8ca of _0x3184c0){const _0x4206b5=JSON['stringify']({'jsonrpc':_0x396157(0xcd),'id':_0x396157(0xea),'method':'user.claimActivity','params':{'activityId':_0x3ac8ca['id']}});await fetch(url,{'method':_0x396157(0xc7),'headers':_0x27fddc,'body':_0x4206b5}),console['log'](_0x396157(0x8b)+_0x39934c+'\x20'+_0x4f8f0b+_0x396157(0x86)+_0x3ac8ca['id']),await delay(0x2710);}}else console['error'](_0x396157(0xc6)+_0x39934c+'\x20'+_0x4f8f0b+':',_0x5c535b);}catch(_0x291540){console['error']('Error\x20for\x20'+_0x39934c+'\x20'+_0x4f8f0b+':',_0x291540);}},claimMiningEvent=async(_0x53a51,_0x3b15a7,_0x41cb4c,_0x1bbc0f,_0x5f33c9)=>{const _0x586bf8=_0x2bf73b;try{const _0x508481={'accept':_0x586bf8(0x8e),'accept-language':_0x586bf8(0xc1),'authorization':_0x586bf8(0xc2)+_0x53a51,'client-language':'en','content-type':_0x586bf8(0xe2),'priority':_0x586bf8(0xd9),'sec-ch-ua':_0x586bf8(0xce),'sec-ch-ua-mobile':'?0','sec-ch-ua-platform':_0x586bf8(0x94),'sec-fetch-dest':_0x586bf8(0x91),'sec-fetch-mode':_0x586bf8(0xe5),'sec-fetch-site':_0x586bf8(0xb9),'Referer':_0x586bf8(0xc9),'Referrer-Policy':_0x586bf8(0xa4)},_0x3fcb80=JSON[_0x586bf8(0xca)]({'jsonrpc':_0x586bf8(0xcd),'id':'miningEvent.startSession','method':_0x586bf8(0xa8),'params':{'miningEventId':0x7}}),_0x66e5dd=await fetch(url,{'method':_0x586bf8(0xc7),'headers':_0x508481,'body':_0x3fcb80}),_0x16b989=await _0x66e5dd[_0x586bf8(0xd2)]();if(_0x16b989[_0x586bf8(0xd0)]){if(_0x16b989['error'][_0x586bf8(0xbd)]==='Mining\x20session\x20in\x20progress.'){console[_0x586bf8(0xd0)](_0x586bf8(0x98)+_0x3b15a7+'\x20'+_0x41cb4c+_0x586bf8(0x9a)),await claimDailyReward(_0x53a51,_0x3b15a7,_0x41cb4c,_0x1bbc0f,_0x5f33c9,!![]);const _0x5aa0c4=getRandomRetryInterval();console[_0x586bf8(0xd0)](_0x586bf8(0xb1)+(_0x5aa0c4/0xea60)[_0x586bf8(0x97)](0x2)+_0x586bf8(0xa9)),setTimeout(()=>claimMiningEvent(_0x53a51,_0x3b15a7,_0x41cb4c,_0x1bbc0f,_0x5f33c9),_0x5aa0c4);}else _0x16b989['error'][_0x586bf8(0xbd)]===_0x586bf8(0xac)?(console[_0x586bf8(0xd0)]('Error\x20for\x20'+_0x3b15a7+'\x20'+_0x41cb4c+_0x586bf8(0xdc)),setTimeout(()=>authenticateUser(_0x1bbc0f,_0x5f33c9,'y','y','y'),0xea60)):console['error'](_0x586bf8(0xa7)+_0x3b15a7+'\x20'+_0x41cb4c+':',_0x16b989[_0x586bf8(0xd0)][_0x586bf8(0xbd)]);return;}if(_0x16b989['result']&&_0x16b989[_0x586bf8(0x9e)][_0x586bf8(0xe3)]&&_0x16b989[_0x586bf8(0x9e)][_0x586bf8(0xe3)]['miningUser']){const _0x48e1cc=_0x16b989['result']['miningEvent'][_0x586bf8(0x84)][_0x586bf8(0xbe)],_0x256daf=_0x16b989[_0x586bf8(0x9e)][_0x586bf8(0xe3)][_0x586bf8(0x84)][_0x586bf8(0x9d)],_0xef2942=_0x48e1cc/_0x256daf*0x3c+getRandomInt(0x1,0xa),_0x554a22=_0xef2942*0x3c*0x3e8;console['log']('Sukses\x20claim\x20untuk\x20'+_0x3b15a7+'\x20'+_0x41cb4c+_0x586bf8(0xb7)+_0xef2942[_0x586bf8(0x97)](0x2)+_0x586bf8(0x9c));const _0x570a90=_0x16b989[_0x586bf8(0x9e)][_0x586bf8(0xb6)]?_0x16b989['result'][_0x586bf8(0xb6)][_0x586bf8(0xda)]:_0x53a51;await claimDailyReward(_0x570a90,_0x3b15a7,_0x41cb4c,_0x1bbc0f,_0x5f33c9,![]),setTimeout(()=>claimMiningEvent(_0x570a90,_0x3b15a7,_0x41cb4c,_0x1bbc0f,_0x5f33c9),_0x554a22);}else console['error']('Unexpected\x20response\x20for\x20'+_0x3b15a7+'\x20'+_0x41cb4c+':',_0x16b989);}catch(_0x357330){console[_0x586bf8(0xd0)](_0x586bf8(0xa7)+_0x3b15a7+'\x20'+_0x41cb4c+':',_0x357330),_0x357330[_0x586bf8(0xc8)]===_0x586bf8(0xe7)&&_0x357330['code']===_0x586bf8(0xa0)&&(console['error'](_0x586bf8(0xc4)+_0x3b15a7+'\x20'+_0x41cb4c+_0x586bf8(0x95)),setTimeout(()=>claimMiningEvent(_0x53a51,_0x3b15a7,_0x41cb4c,_0x1bbc0f,_0x5f33c9),0xea60));}},claimDailyReward=async(_0x33a7f7,_0xfb8791,_0xd7c45b,_0x4ad10d,_0x15f6c0,_0x16f1f9)=>{const _0x13b658=_0x2bf73b;try{const _0x1fb960={'accept':_0x13b658(0x8e),'accept-language':_0x13b658(0xc1),'authorization':_0x13b658(0xc2)+_0x33a7f7,'client-language':'en','content-type':_0x13b658(0xe2),'priority':_0x13b658(0xd9),'sec-ch-ua':_0x13b658(0xce),'sec-ch-ua-mobile':'?0','sec-ch-ua-platform':_0x13b658(0x94),'sec-fetch-dest':'empty','sec-fetch-mode':_0x13b658(0xe5),'sec-fetch-site':_0x13b658(0xb9),'x-install-uuid':_0x15f6c0,'Referer':_0x13b658(0xc9),'Referrer-Policy':'strict-origin-when-cross-origin'},_0x23b96d=JSON['stringify']({'jsonrpc':'2.0','id':_0x13b658(0xd5),'method':_0x13b658(0xd5),'params':{}}),_0x2d2e07=await fetch(url,{'method':'POST','headers':_0x1fb960,'body':_0x23b96d}),_0x122c4b=await _0x2d2e07['json']();if(_0x122c4b['error']){_0x122c4b[_0x13b658(0xd0)][_0x13b658(0xbd)]===_0x13b658(0xac)?(console[_0x13b658(0xd0)](_0x13b658(0xa7)+_0xfb8791+'\x20'+_0xd7c45b+_0x13b658(0xdc)),setTimeout(()=>authenticateUser(_0x4ad10d,_0x15f6c0,'y','y','y'),0xea60)):console[_0x13b658(0xd0)](_0x13b658(0xa7)+_0xfb8791+'\x20'+_0xd7c45b+':',_0x122c4b[_0x13b658(0xd0)][_0x13b658(0xbd)]);return;}if(_0x122c4b['result']&&_0x122c4b[_0x13b658(0x9e)]['dailyReward']){const _0x41f7d9=_0x122c4b[_0x13b658(0x9e)][_0x13b658(0x8f)][_0x13b658(0xbc)],_0x1d6879=new Date(_0x122c4b[_0x13b658(0x9e)][_0x13b658(0x8f)][_0x13b658(0xb4)])[_0x13b658(0x85)]();if(_0x41f7d9>0x0)await performSpin(_0x33a7f7,_0xfb8791,_0xd7c45b,_0x4ad10d,_0x15f6c0,_0x41f7d9,_0x1d6879);else{if(_0x16f1f9){const _0x519539=_0x1d6879+getRandomNextSpinInterval()-Date['now']();console[_0x13b658(0xaa)]('Next\x20spin\x20for\x20'+_0xfb8791+'\x20'+_0xd7c45b+'\x20in\x20'+(_0x519539/0xea60)['toFixed'](0x2)+'\x20minutes.'),setTimeout(()=>claimDailyReward(_0x33a7f7,_0xfb8791,_0xd7c45b,_0x4ad10d,_0x15f6c0,![]),_0x519539);}}}else console[_0x13b658(0xd0)](_0x13b658(0xc6)+_0xfb8791+'\x20'+_0xd7c45b+':',_0x122c4b);}catch(_0x4bf225){console[_0x13b658(0xd0)](_0x13b658(0xa7)+_0xfb8791+'\x20'+_0xd7c45b+':',_0x4bf225),_0x4bf225['type']==='system'&&_0x4bf225[_0x13b658(0xde)]===_0x13b658(0xa0)&&(console[_0x13b658(0xd0)](_0x13b658(0xc4)+_0xfb8791+'\x20'+_0xd7c45b+_0x13b658(0x95)),setTimeout(()=>claimDailyReward(_0x33a7f7,_0xfb8791,_0xd7c45b,_0x4ad10d,_0x15f6c0,_0x16f1f9),0xea60));}},performSpin=async(_0x4613a0,_0x35df5f,_0x542833,_0x48914a,_0x18aec5,_0x4af7dd,_0x22f7ac)=>{const _0xf104ee=_0x2bf73b;try{const _0x13a61c={'accept':'*/*','accept-language':_0xf104ee(0xc1),'authorization':_0xf104ee(0xc2)+_0x4613a0,'client-language':'en','content-type':_0xf104ee(0xe2),'priority':'u=1,\x20i','sec-ch-ua':'\x22Chromium\x22;v=\x22124\x22,\x20\x22Microsoft\x20Edge\x22;v=\x22124\x22,\x20\x22Not-A.Brand\x22;v=\x2299\x22,\x20\x22Microsoft\x20Edge\x20WebView2\x22;v=\x22124\x22','sec-ch-ua-mobile':'?0','sec-ch-ua-platform':_0xf104ee(0x94),'sec-fetch-dest':'empty','sec-fetch-mode':_0xf104ee(0xe5),'sec-fetch-site':'cross-site','x-install-uuid':_0x18aec5,'Referer':_0xf104ee(0xc9),'Referrer-Policy':_0xf104ee(0xa4)},_0x46ee87=JSON[_0xf104ee(0xca)]([{'jsonrpc':_0xf104ee(0xcd),'id':'dailyReward.claimPrize','method':_0xf104ee(0x96),'params':{}},{'jsonrpc':'2.0','id':_0xf104ee(0xd5),'method':_0xf104ee(0xd5),'params':{}}]);let _0x403f94=![];for(let _0x4cf779=0x0;_0x4cf779<_0x4af7dd;_0x4cf779++){const _0x1cb937=await fetch(url,{'method':_0xf104ee(0xc7),'headers':_0x13a61c,'body':_0x46ee87}),_0x32864b=await _0x1cb937[_0xf104ee(0xd2)]();if(_0x32864b[0x0][_0xf104ee(0xd0)]){if(_0x32864b[0x0][_0xf104ee(0xd0)][_0xf104ee(0xbd)]==='No\x20spins\x20available'){console['error']('No\x20spins\x20available\x20for\x20'+_0x35df5f+'\x20'+_0x542833+_0xf104ee(0x9a)),await claimDailyReward(_0x4613a0,_0x35df5f,_0x542833,_0x48914a,_0x18aec5,![]);return;}else{console['error'](_0xf104ee(0xa3)+_0x35df5f+'\x20'+_0x542833+':',_0x32864b[0x0][_0xf104ee(0xd0)][_0xf104ee(0xbd)]);_0x32864b[0x0][_0xf104ee(0xd0)]['message']===_0xf104ee(0xac)&&(console[_0xf104ee(0xd0)](_0xf104ee(0xa7)+_0x35df5f+'\x20'+_0x542833+_0xf104ee(0xdc)),setTimeout(()=>authenticateUser(_0x48914a,_0x18aec5,'y','y','y'),0xea60));return;}}_0x403f94=!![],console[_0xf104ee(0xaa)](_0xf104ee(0xbf)+_0x35df5f+'\x20'+_0x542833),_0x4cf779<_0x4af7dd-0x1&&await delay(0x2710);}if(_0x403f94){const _0x26e32e=_0x22f7ac+getRandomNextSpinInterval()-Date[_0xf104ee(0xec)]();console[_0xf104ee(0xaa)](_0xf104ee(0x89)+_0x35df5f+'\x20'+_0x542833+_0xf104ee(0xb5)+(_0x26e32e/0xea60)['toFixed'](0x2)+_0xf104ee(0x9c)),setTimeout(()=>claimDailyReward(_0x4613a0,_0x35df5f,_0x542833,_0x48914a,_0x18aec5,![]),_0x26e32e);}}catch(_0x30efbb){console[_0xf104ee(0xd0)](_0xf104ee(0xa3)+_0x35df5f+'\x20'+_0x542833+':',_0x30efbb),_0x30efbb[_0xf104ee(0xc8)]===_0xf104ee(0xe7)&&_0x30efbb[_0xf104ee(0xde)]===_0xf104ee(0xa0)&&(console[_0xf104ee(0xd0)](_0xf104ee(0xc4)+_0x35df5f+'\x20'+_0x542833+_0xf104ee(0x95)),setTimeout(()=>performSpin(_0x4613a0,_0x35df5f,_0x542833,_0x48914a,_0x18aec5,_0x4af7dd,_0x22f7ac),0xea60));}},performUpgrade=async(_0x458188,_0x554e5f,_0x54c3e1,_0x45f43d,_0x569f52)=>{const _0x3a2cf3=_0x2bf73b;try{const _0x457cb7={'accept':_0x3a2cf3(0x8e),'accept-language':_0x3a2cf3(0xc1),'authorization':'Bearer\x20'+_0x458188,'client-language':'en','content-type':_0x3a2cf3(0xe2),'priority':_0x3a2cf3(0xd9),'sec-ch-ua':_0x3a2cf3(0xce),'sec-ch-ua-mobile':'?0','sec-ch-ua-platform':_0x3a2cf3(0x94),'sec-fetch-dest':_0x3a2cf3(0x91),'sec-fetch-mode':'cors','sec-fetch-site':'cross-site','x-install-uuid':_0x45f43d,'Referer':_0x3a2cf3(0xc9),'Referrer-Policy':_0x3a2cf3(0xa4)},_0x24f135=JSON[_0x3a2cf3(0xca)]({'jsonrpc':_0x3a2cf3(0xcd),'id':_0x3a2cf3(0xe0),'method':_0x3a2cf3(0xe0),'params':{'miningEventId':0x7,'upgrade':_0x3a2cf3(0xc0)}}),_0x7cb48d=await fetch(url,{'method':_0x3a2cf3(0xc7),'headers':_0x457cb7,'body':_0x24f135}),_0xb2e4b7=await _0x7cb48d[_0x3a2cf3(0xd2)]();if(_0xb2e4b7[_0x3a2cf3(0xd0)]){if(_0xb2e4b7[_0x3a2cf3(0xd0)][_0x3a2cf3(0xbd)]===_0x3a2cf3(0xad)){console[_0x3a2cf3(0xaa)](_0x3a2cf3(0xeb)+_0x554e5f+'\x20'+_0x54c3e1+'.');return;}else _0xb2e4b7['error']['message']===_0x3a2cf3(0xac)?(console[_0x3a2cf3(0xd0)](_0x3a2cf3(0xa7)+_0x554e5f+'\x20'+_0x54c3e1+':\x20Unauthorized.\x20Retrying\x20authentication\x20and\x20upgrade\x20in\x201\x20minute...'),setTimeout(()=>authenticateUser(_0x569f52,_0x45f43d,'n','n','y'),0xea60)):console[_0x3a2cf3(0xd0)](_0x3a2cf3(0xa7)+_0x554e5f+'\x20'+_0x54c3e1+':',_0xb2e4b7['error'][_0x3a2cf3(0xbd)]);}else console[_0x3a2cf3(0xaa)]('Upgraded\x20mining\x20cap\x20for\x20'+_0x554e5f+'\x20'+_0x54c3e1+_0x3a2cf3(0x92)),setTimeout(()=>performUpgrade(_0x458188,_0x554e5f,_0x54c3e1,_0x45f43d,_0x569f52),0x4e20);}catch(_0x4cb61b){console[_0x3a2cf3(0xd0)](_0x3a2cf3(0xbb)+_0x554e5f+'\x20'+_0x54c3e1+':',_0x4cb61b),_0x4cb61b['type']===_0x3a2cf3(0xe7)&&_0x4cb61b[_0x3a2cf3(0xde)]===_0x3a2cf3(0xa0)&&(console[_0x3a2cf3(0xd0)](_0x3a2cf3(0xc4)+_0x554e5f+'\x20'+_0x54c3e1+_0x3a2cf3(0x95)),setTimeout(()=>performUpgrade(_0x458188,_0x554e5f,_0x54c3e1,_0x45f43d,_0x569f52),0xea60));}},authenticateUser=async(_0x4a3094,_0x4230fe,_0x5efff4,_0x2cb30e,_0x56cba0,_0x1030d8)=>{const _0xa28e54=_0x2bf73b;try{console[_0xa28e54(0xaa)](_0xa28e54(0xd8)),console[_0xa28e54(0xaa)](_0xa28e54(0xd7)+_0x4230fe);const _0x5585ca={'accept':_0xa28e54(0x8e),'accept-language':_0xa28e54(0xc1),'client-language':'en','content-type':_0xa28e54(0xe2),'priority':_0xa28e54(0xd9),'sec-ch-ua':_0xa28e54(0xce),'sec-ch-ua-mobile':'?0','sec-ch-ua-platform':_0xa28e54(0x94),'sec-fetch-dest':'empty','sec-fetch-mode':_0xa28e54(0xe5),'sec-fetch-site':_0xa28e54(0xb9),'x-install-uuid':_0x4230fe[_0xa28e54(0xc3)](),'Referer':_0xa28e54(0xc9),'Referrer-Policy':'strict-origin-when-cross-origin'},_0x44693c=JSON[_0xa28e54(0xca)]({'jsonrpc':'2.0','id':_0xa28e54(0xae),'method':_0xa28e54(0xae),'params':{'initData':_0x4a3094[_0xa28e54(0xc3)]()}}),_0x327a68=await fetch(url,{'method':_0xa28e54(0xc7),'headers':_0x5585ca,'body':_0x44693c}),_0x29da38=await _0x327a68[_0xa28e54(0xd2)]();if(_0x29da38['result']&&_0x29da38[_0xa28e54(0x9e)][_0xa28e54(0xb6)]&&_0x29da38[_0xa28e54(0x9e)][_0xa28e54(0xb6)][_0xa28e54(0xda)]){const _0x23aaff=_0x29da38[_0xa28e54(0x9e)][_0xa28e54(0xb6)][_0xa28e54(0xda)];let _0x216ee5=_0xa28e54(0xb3),_0x4334f1='User';_0x29da38['result'][_0xa28e54(0xd1)]&&_0x29da38[_0xa28e54(0x9e)][_0xa28e54(0xd1)]['personal']&&(_0x216ee5=_0x29da38[_0xa28e54(0x9e)][_0xa28e54(0xd1)][_0xa28e54(0xaf)][_0xa28e54(0x93)]||_0x216ee5,_0x4334f1=_0x29da38[_0xa28e54(0x9e)][_0xa28e54(0xd1)]['personal'][_0xa28e54(0xe1)]||_0x4334f1),console[_0xa28e54(0xaa)]('Name\x20Telegram\x20:\x20'+_0x216ee5+'\x20'+_0x4334f1),_0x5efff4==='y'&&await claimMiningEvent(_0x23aaff,_0x216ee5,_0x4334f1,_0x4a3094,_0x4230fe),_0x2cb30e==='y'&&await claimDailyReward(_0x23aaff,_0x216ee5,_0x4334f1,_0x4a3094,_0x4230fe,!![]),_0x56cba0==='y'&&await performUpgrade(_0x23aaff,_0x216ee5,_0x4334f1,_0x4230fe,_0x4a3094),_0x1030d8==='y'&&await claimMiningEnded(_0x23aaff,_0x216ee5,_0x4334f1);}else console[_0xa28e54(0xd0)](_0xa28e54(0xdf),_0x29da38);}catch(_0x1a9bb2){console[_0xa28e54(0xd0)]('Error:',_0x1a9bb2);}},main=async()=>{const _0x18a464=_0x2bf73b;try{const _0xce5315=await readFile('loot.txt',_0x18a464(0x90)),_0x496500=_0xce5315[_0x18a464(0xc3)]()['split']('\x0a');console[_0x18a464(0xaa)](_0x18a464(0xd8));const _0x1895a7=await askQuestion(_0x18a464(0x83)),_0x1048c7=await askQuestion(_0x18a464(0xab)),_0x4f9fd0=await askQuestion(_0x18a464(0xdd)),_0x27b747=await askQuestion(_0x18a464(0x9b));for(const _0x57d1e3 of _0x496500){const [_0x5b9e7d,_0xb91fd9]=_0x57d1e3[_0x18a464(0xb8)]('|')[_0x18a464(0xe8)](_0x2b638a=>_0x2b638a[_0x18a464(0xc3)]());_0x5b9e7d&&_0xb91fd9?(await authenticateUser(_0x5b9e7d,_0xb91fd9,_0x1895a7,_0x1048c7,_0x4f9fd0,_0x27b747),await delay(0xbb8)):console['error'](_0x18a464(0xd3),_0x57d1e3);}}catch(_0xf708a){console[_0x18a464(0xd0)](_0x18a464(0xba),_0xf708a);}};function _0x24c9(){const _0x383baf=['error','user','json','Invalid\x20entry:','stdin','dailyReward.getPrizes','461709HczUgg','Login\x20with\x20:\x20','======================================================================','u=1,\x20i','authenticate','length',':\x20Unauthorized.\x20Retrying\x20authentication\x20and\x20claim\x20in\x201\x20minute...','Auto\x20upgrade\x20?\x20(y\x20/\x20n)\x20:\x20','code','Authentication\x20failed:','miningEvent.upgrade','lastname','text/plain;charset=UTF-8','miningEvent','7655RHZphP','cors','112Cqieen','system','map','util','user.claimActivity','Done\x20upgrade\x20mining\x20cap\x20for\x20','now','Auto\x20claim\x20?\x20(y\x20/\x20n)\x20:\x20','miningUser','getTime',',\x20activity\x20ID:\x20','1299746mrHoTr','user.getActivities','Next\x20spin\x20for\x20','1725550UDzZfK','Claimed\x20mining\x20ended\x20reward\x20for\x20','No\x20mining\x20ended\x20claims\x20for\x20','12eFMHLA','*/*','dailyReward','utf8','empty','.\x20Retrying\x20in\x2020\x20seconds...','firstname','\x22Windows\x22','.\x20Retrying\x20in\x201\x20minute...','dailyReward.claimPrize','toFixed','Mining\x20session\x20in\x20progress\x20for\x20','close','.\x20Checking\x20for\x20spins...','Auto\x20claim\x20mining\x20ended?\x20(y\x20/\x20n)\x20:\x20','\x20minutes.','currentSpeedMicroToken','result','readline','ECONNRESET','activities','36612uOPsjx','Error\x20during\x20spin\x20for\x20','strict-origin-when-cross-origin','12PdYkZN','promisify','Error\x20for\x20','miningEvent.startSession','\x20minutes...','log','Auto\x20spin\x20?\x20(y\x20/\x20n)\x20:\x20','Unauthorized','Not\x20enough\x20assets.','user.authentication.loginUsingTelegram','personal','16078AtOiCA','Retrying\x20mining\x20session\x20in\x20','1086jAZkqh','Unknown','nextStreakDayTimestamp','\x20in\x20','tokens',',\x20next\x20claim\x20in\x20','split','cross-site','Error:','Error\x20during\x20upgrade\x20for\x20','spinsCountAvailable','message','currentSessionMicroToken','Done\x20spin\x20for\x20','storage','en-US,en;q=0.9','Bearer\x20','trim','Connection\x20reset\x20for\x20','readFile','Unexpected\x20response\x20for\x20','POST','type','https://prizes.gamee.com/','stringify','question','16228256pFpPPq','2.0','\x22Chromium\x22;v=\x22124\x22,\x20\x22Microsoft\x20Edge\x22;v=\x22124\x22,\x20\x22Not-A.Brand\x22;v=\x2299\x22,\x20\x22Microsoft\x20Edge\x20WebView2\x22;v=\x22124\x22','89xFSnxw'];_0x24c9=function(){return _0x383baf;};return _0x24c9();}function _0x5913(_0x3c3d1c,_0x4f78a2){const _0x24c913=_0x24c9();return _0x5913=function(_0x591397,_0x34bb78){_0x591397=_0x591397-0x83;let _0x19d31b=_0x24c913[_0x591397];return _0x19d31b;},_0x5913(_0x3c3d1c,_0x4f78a2);}main();
