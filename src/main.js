import Vue from 'vue'
Vue.config.devtools = true
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import './registerServiceWorker'
import Toasted from 'vue-toasted';
 
Vue.use(Toasted);

Vue.config.productionTip = false;

Vue.filter('snippet', val => {
  //if (!val || typeof (val) != 'string') return ''
  if (val.length >= 35)
    val = val.slice(0, 35) + '...'
  return val
})

Vue.filter('titleSnippet', val => {
  //if (!val || typeof (val) != 'string') return ''
  if (val.length >= 25)
    val = val.slice(0, 25) + '...'
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