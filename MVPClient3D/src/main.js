/*
 * @Author: your name
 * @Date: 2020-09-09 10:24:58
 * @LastEditTime: 2020-12-30 14:51:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MVPClient3D/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import "echarts-gl";
import animated from "animate.css"

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
// Vue.prototype.$devDeep = 0;
Vue.use(ElementUI);
Vue.use(animated)
new Vue({
    render: h => h(App),
}).$mount('#app');
Vue.config.silent = true;