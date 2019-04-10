/* 
<script src="../node_modules/leancloud-storage/dist/av-min.js"></script>
<script src="./js/initializers/av.js"></script>
<script src="../node_modules/jquery/dist/jquery.min.js"></script>
<script src="./js/index/event-hub.js"></script>
<script src="./js/index/tabs.js"></script>
<script src="./js/index/page-1.js"></script>
<script src="./js/index/page-2.js"></script>
<script src="./js/index/page-3.js"></script> */
window.$ = require('jquery')
var AV = require('leancloud-storage')
import ss from './initializers/av.js'
import tabs from './index/tabs'
import page1 from './index/page-1'
import page1_1 from './index/page-1-1'
import page1_2 from './index/page-1-2'
import page2 from './index/page-2'
import page3 from './index/page-3'
import eventHub from './index/event-hub'

window.eventHub = eventHub
window.AV = AV
let { APP_ID, APP_KEY } = ss

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})

tabs()
page1()
page1_1()
page1_2()
page2()
page3()
