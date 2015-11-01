<template>
<div>
  <slot></slot>
</div>
</template>

<script>
import ChildrenUtils, {
  toArrayChildren,
  findShownChildInChildrenByKey,
  findChildInChildrenByKey,
  isSameChildren,
} from './ChildrenUtils'

import AnimateChild from './AnimateChild.vue'
import animUtil from './util'
import { defaultProps, oneOfType } from '../../../utils'

const defaultKey = 'ant_animate_' + Date.now()

function noop () {}

export default {
  props: defaultProps({
    component: 'span',
    animation: {},
    transitionName: String,
    transitionEnter: true,
    transitionLeave: true,
    transitionAppear: false,
    onEnd: noop,
    onEnter: noop,
    onLeave: noop,
    onAppear: noop,
    showProp: String
  })
}

</script>
