<template>

</template>

<script>
import TableRow from './TableRow.vue'
import { defaultProps } from '../../../utils'

export default {
  props: defaultProps({
    prefixCls: 'ant-table',
    bodyStyle: {},
    style: {},
    childrenColumnName: 'children',
    data: [],
    expandIconAsCell: false,
    useFixedHeader: false,
    columns: [],
    rowKey: (o) => o.key,
    rowClassName: () => '',
    expandedRowClassName: () => ''
  }),

  data () {
    return {
      expandedRows: [],
      data: this.data.concat()
    }
  },

  components: { TableRow },

  methods: {
    _onExpanded (expanded, record) {
      const expandedRows = this.expandedRows.concat()
      const info = expandedRows.filter((i) => {
        return i.record === expanded
      })

      if (ee) {

      } else {
        reljlasfjd
      }
    }
  }
}

</script>
