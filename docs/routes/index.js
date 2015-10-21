import ComponentsView from '../views/components.vue'
import NotFoundView from '../views/not-found.vue'

export function configRouter (router) {
  router.map({
    // nested example
    'components': {
      component: ComponentsView
      // subRoutes: {
      //   'profile': {
      //     component: UserProfileView
      //   }
      // }
    },

    '*': {
      component: NotFoundView
    }
  })

  // global before
  // 3 options:
  // 1. return a boolean
  // 2. return a Promise that resolves to a boolean
  // 3. call transition.next() or transition.abort()
  router.beforeEach((transition) => {
    if (transition.to.path === '/forbidden') {
      router.app.authenticating = true
      setTimeout(() => {
        router.app.authenticating = false
        // alert('this route is forbidden by a global before hook')
        transition.abort()
      }, 3000)
    } else {
      transition.next()
    }
  })
}
