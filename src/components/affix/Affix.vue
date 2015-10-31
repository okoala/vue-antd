<template></template>

<script>
import { defaultProps } from '../../utils'

export default {
  props: defaultProps({
    offset: oneOfType([Number, String], 0]
  })
}

</script>
