
export function configRouter (router) {
  router.map({
    'components': {
      component: require('../views/components.vue'),
      subRoutes: {
        'introduce': {
          component: require('../views/docs/introduce.vue')
        },

        'getting-started': {
          component: require('../views/docs/getting-started.vue')
        },

        'download': {
          component: require('../views/docs/download.vue')
        },

        'affix': {
          component: require('../components/affix.vue')
        },

        'alert': {
          component: require('../components/alert.vue')
        },

        'button': {
          component: require('../components/button.vue')
        },

        'badge': {
          component: require('../components/badge.vue')
        },

        'breadcrumb': {
          component: require('../components/breadcrumb.vue')
        },

        'checkbox': {
          component: require('../components/checkbox.vue')
        },

        'carousel': {
          component: require('../components/carousel.vue')
        },

        'collapse': {
          component: require('../components/collapse.vue')
        },

        'dropdown': {
          component: require('../components/dropdown.vue')
        },

        'iconfont': {
          component: require('../components/iconfont.vue')
        },

        'input-number': {
          component: require('../components/input-number.vue')
        },

        'layout': {
          component: require('../components/layout.vue')
        },

        'message': {
          component: require('../components/message.vue')
        },

        'menu': {
          component: require('../components/menu.vue')
        },

        'notification': {
          component: require('../components/notification.vue')
        },

        'progress': {
          component: require('../components/progress.vue')
        },

        'queue-anim': {
          component: require('../components/queue-anim.vue')
        },

        'popconfirm': {
          component: require('../components/popconfirm.vue')
        },

        'popover': {
          component: require('../components/popover.vue')
        },

        'upload': {
          component: require('../components/upload.vue')
        },

        'modal': {
          component: require('../components/modal.vue')
        },

        'radio': {
          component: require('../components/radio.vue')
        },

        'select': {
          component: require('../components/select.vue')
        },

        'slider': {
          component: require('../components/slider.vue')
        },

        'switch': {
          component: require('../components/switch.vue')
        },

        'steps': {
          component: require('../components/steps.vue')
        },

        'spin': {
          component: require('../components/spin.vue')
        },

        'table': {
          component: require('../components/table.vue')
        },

        'tag': {
          component: require('../components/tag.vue')
        },

        'tooltip': {
          component: require('../components/tooltip.vue')
        },

        'timeline': {
          component: require('../components/timeline.vue')
        },

        '_trigger': {
          component: require('../components/_trigger.vue')
        },

        '_align': {
          component: require('../components/_align.vue')
        },

        '_animate': {
          component: require('../components/_animate.vue')
        },

        '_notification': {
          component: require('../components/_notification.vue')
        },

        '_tooltip': {
          component: require('../components/_tooltip.vue')
        },

        '_dialog': {
          component: require('../components/_dialog.vue')
        }
      }
    },

    '*': {
      component: require('../views/not-found.vue')
    }
  })

  router.alias({
    '/components': '/components/introduce',
    '/docs/introduce': '/components/introduce',
    '/docs/getting-started': '/components/getting-started',
    '/docs/download': '/components/download'
  })

  // global before
  // 3 options:
  // 1. return a boolean
  // 2. return a Promise that resolves to a boolean
  // 3. call transition.next() or transition.abort()
  router.beforeEach(transition => {
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
