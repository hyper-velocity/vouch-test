import { route } from 'quasar/wrappers'
import {
  createRouter,
  createWebHistory
} from 'vue-router'

import routes from './routes'

export const router = createRouter({
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createWebHistory()
})

export default route(function () {
  return router
})
