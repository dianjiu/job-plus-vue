import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/common-style.less'

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
Vue.use(ElementUI)
Vue.prototype.$success = (message) => Vue.prototype.$message({ type: 'success', message })
Vue.prototype.$danger = (message) => Vue.prototype.$message({ type: 'error', message })
Vue.prototype.$warning = (message) => Vue.prototype.$message({ type: 'warning', message })
Vue.prototype.$quickConfirm = (title,successCallback, failCallback=function(){}, options={}) => {
  Vue.prototype.$confirm(
    title,
    "提示",
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      distinguishCancelAndClose: true,
      closeOnClickModal:false,
      ...options
    }
  ).then(function() {
    successCallback();
  }).catch(function(action) {
    if(action == 'cancel') {
      failCallback();
    }
  });
};
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
