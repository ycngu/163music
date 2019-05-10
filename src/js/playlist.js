/* <script src="../node_modules/leancloud-storage/dist/av-min.js"></script>
<script src="./js/initializers/av.js"></script>
<script src="../node_modules/jquery/dist/jquery.min.js"></script>
<script src="js/playlist/playlist.js"></script> */

window.$ = require('jquery')
var AV = require('leancloud-storage')
require("@babel/polyfill")
import ss from './initializers/av.js'
import playlist from './playlist/playlist.js'


window.AV = AV
let { APP_ID, APP_KEY } = ss

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

playlist()