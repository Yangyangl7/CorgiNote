import Vue from 'vue'
Vue.config.devtools = true
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.filter('snippet', val => {
  //if (!val || typeof (val) != 'string') return ''
  if (val.length >= 50)
    val = val.slice(0, 50) + '...'
  return val
})

Vue.filter('shortSnippet', val => {
  //if (!val || typeof (val) != 'string') return ''
  if (val.length >= 14)
    val = val.slice(0, 14) + '...'
  return val
})

let app = null;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})