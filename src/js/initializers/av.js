// fs = require('fs')
var APP_ID = 'BpRDxrD5ekiyXXc7ruHL9ooy-gzGzoHsz';
var APP_KEY = '60kbTMFODU37TGXG0XwuAx8q';

// var key = fs.readFileSync('../../leancloud.json')
// var {APP_ID, APP_KEY} = JSON.parse(key)

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})