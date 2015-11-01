import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueAsyncData from 'vue-async-data'
import { configRouter } from './routes'
import App from './views/app.vue'

require('es6-promise').polyfill()

import '../style/index.less'

Vue.config.debug = true

// install router
Vue.use(VueRouter)

// Load Resource
Vue.use(VueResource)

// use globally
// you can also just use `VueAsyncData.mixin` where needed
Vue.use(VueAsyncData)

// create router
const router = new VueRouter({
  saveScrollPosition: true
})

// configure router
configRouter(router)

// boostrap the app
router.start(Vue.extend(App), '#root')

// just for debugging
window.router = router
