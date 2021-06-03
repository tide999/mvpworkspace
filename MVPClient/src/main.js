import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import animated from "animate.css"

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.use(animated)
new Vue({
    render: h => h(App),
}).$mount('#app');
Vue.config.silent = true;