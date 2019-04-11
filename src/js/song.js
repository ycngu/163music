//   <script src="../node_modules/leancloud-storage/dist/av-min.js"></script>
//   <script src="./js/initializers/av.js"></script>
//   <script src="../node_modules/jquery/dist/jquery.min.js"></script>
//   <script src="./js/index/event-hub.js"></script>
//   <script src="./js/song/lyric.js"></script>
//   <script src="./js/song/song.js"></script>

window.$ = require('jquery')
var AV = require('leancloud-storage')
import eventHub from './index/event-hub'
import ss from './initializers/av.js'
import {parseLyric,appendLyric} from './song/lyric'
import song from './song/song'


window.onceLrc = []
window.eventHub = eventHub
window.AV = AV
window.parseLyric = parseLyric
window.appendLyric = appendLyric
let { APP_ID, APP_KEY } = ss

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})


song()