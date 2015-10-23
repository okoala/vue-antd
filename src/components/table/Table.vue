<template>

</template>

<script>
import objectAssign from 'object-assign'
import reqwest from 'reqwest-without-xhr2'
import { defaultProps, oneOfType } from '../../utils'

export default {
  props: defaultProps({
    rowSelection: Object,
    pagination: Object,
    size: 'normal',
    dataSource: oneOfType(Array, Object),
    columns: Array,
    expandIconAsCell: true,
    onChange: () => {},

    prefixCls: 'ant-table',
    useFixedHeader: false,
    bordered: false
  }),

  data () {
    return {
      selectedRowKeys: [],
      data: [],
      filters: {},
      loading: false,
      sortColumn: '',
      sortOrder: '',
      sorter: null
    }
  },

  methods: {
    isLocalDataSource () {
      return Array.isArray(this.dataSource)
    },

    getRemoteDtaSource () {
      return this.dataSource
    },

    toggleSortOrder (order, column) {
      let sortColumn = this.sortColumn
      let sortOrder = this.sortOrder
      let sorter

      let isSortColumn = this.isSortColumn(column)


    },

    isSortColumn (column) {
      if (!column || !this.sortColumn) {
        return false
      }

      let colKey =
    }
  }
}
</script>
