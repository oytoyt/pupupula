import Vue from 'vue'
import Router from 'vue-router'
import milk from '@/components/game/milk'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/milk' },
    { path: '/milk', name: 'milk', component: milk },
    { path: '*', redirect: '/milk' }
  ]
})
