import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import Settings from './views/Settings.vue'
import Onboarding from './views/Onboarding.vue'
import OnboardingStep from './views/OnboardingStep.vue'
import RecipesIndex from './views/recipes/Index.vue'
import RecipesId from './views/recipes/Id.vue'
import RecipesHome from './views/recipes/Home.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'is-active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/recipes'
    },
    {
      path: '/recipes',
      name: 'recipes-index',
      component: RecipesIndex,
      children: [
        {
          path: '',
          name: 'recipes-home',
          component: RecipesHome
        },
        {
          path: '/recipes/:recipeId/:index',
          name: 'recipes-id',
          component: RecipesId
        }
      ]
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
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
