import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Settings from './views/Settings.vue'
import Onboarding from './views/Onboarding.vue'
import OnboardingStep from './views/OnboardingStep.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: Onboarding,
      redirect: '/onboarding/1',
      children: [
        {
          path: ':step',
          name: 'onboarding-step',
          component: OnboardingStep
        }
      ]
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
