import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

// Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  observer: true,

  // optional
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  },
  preLoad: 5,
  error: 'dist/error.png',
  loading: './assets/pixel.png',
  attempt: 1
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('excludedIngredients') && !to.path.includes('onboarding')) {
    next({
      path: '/onboarding'
    })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
