import Vue from 'vue'
import App from './App'
import store from './store'
import plugin from './js_sdk/uni-admin/plugin'
import {install} from '@/utils/install';
import elementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

Vue.use(install);
Vue.use(plugin)
Vue.use(elementUi)

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
