<template>
<div class="clearfix" :class="{'ant-table-empty': isEmpty}">
  <div :class="tableClass" :style="style">
    <div v-if="useFixedHeader" :class="prefixCls + '-header'">
      <table>
        <colgroup>
          <col v-if="expandIconAsCell" :class="prefixCls + '-expand-icon-col'" key="rc-table-expand-icon-col"></col>
          <col v-for="col in columns" :style="{'width': col.width}"></col>
        </colgroup>
        <thead :class="prefixCls + '-thead'">
          <tr>
            <th v-for="col in columns">{{col.title}}</th>
          </tr>
        </thead>
      </table>
    </div>
    <div :class="prefixCls + '-body'" :style="bodyStyle">
      <table>
        <colgroup>
          <col v-if="expandIconAsCell" :class="prefixCls + '-expand-icon-col'" key="rc-table-expand-icon-col"></col>
          <col v-for="col in columns" :style="{'width': col.width}"></col>
        </colgroup>
        <thead :class="prefixCls + '-thead'">
          <tr>
            <th v-for="col in columns">{{col.title}}</th>
          </tr>
        </thead>
        <tbody :class="prefixCls + '-tbody'">
          <tr v-for="rst in data" :class="prefixCls + classString">
            <td v-for="col in columns" :class=""></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import objectAssign from 'object-assign'
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
    bordered: false,
    bodyStyle: Object,
    style: Object
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

  computed: {
    isEmpty () {
      return !!this.data.length
    },

    tableClass () {
      let classString = this.prefixCls

      if (this.loading) {
        classString += ' ant-table-loading'
      }

      if (this.size === 'small') {
        classString += ' ant-table-small'
      }

      if (this.bordered) {
        classString += ' ant-table-bordered'
      }

      return classString
    }
  },

  ready () {
    console.log('true')
  },

  methods: {

  }
}
</script>
