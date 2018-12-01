import Vue from 'vue'
Vue.config.devtools = true
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.filter('snippet', val => {
  // if (!val || typeof (val) != 'string') return ''
  if (val.length >= 50)
    val = val.slice(0, 50) + '...'
  return val
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
