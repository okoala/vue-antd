<template>
<div class="clearfix" :class="{'ant-table-empty': isEmpty}">
  <div :class="tableClass" :style="style">
    <div v-if="useFixedHeader" :class="prefixCls + '-header'">
      <table>
        <colgroup>
          <col v-if="expandIconAsCell" :class="prefixCls + '-expand-icon-col'"></col>
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
          <col v-if="expandIconAsCell" :class="prefixCls + '-expand-icon-col'"></col>
          <col v-for="col in columns" :style="{'width': col.width}"></col>
        </colgroup>
        <thead :class="prefixCls + '-thead'">
          <tr>
            <th v-for="col in columns">{{col.title}}</th>
          </tr>
        </thead>
        <tbody :class="prefixCls + '-tbody'" v-el:render>
          <tr v-for="data in dataSource" :class="prefixCls + classString">
            <td v-for="col in columns">{{{!col.render && col.dataIndex ? data[col.dataIndex] : ''}}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import { defaultProps, oneOfType } from '../../utils'

export default {
  props: defaultProps({
    rowSelection: Object,
    pagination: Object,
    size: 'normal',
    dataSource: oneOfType([Array, Object]),
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
      filters: {},
      loading: false,
      sortColumn: '',
      sortOrder: '',
      sorter: null
    }
  },

  computed: {

    isEmpty () {
      return this.dataSource && !this.dataSource.length
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

  watch: {
    dataSource (value) {
      this.compileRender()
    }
  },

  ready () {
    this.compileRender()
  },

  methods: {
    compileRender () {
      this.$nextTick(() => {
        const $el = this.$els.render

        for (let i = 0; i < this.columns.length; i++) {
          const curCol = this.columns[i]
          const dataIndex = curCol.dataIndex
          const renderFn = curCol.render
          if (renderFn) {
            for (let j = 0; j < this.dataSource.length; j++) {
              const value = this.dataSource[j]
              const template = renderFn(value[dataIndex], value, j)
              const cell = document.createElement('DIV')
              cell.innerHTML = template
              // TODO
              // 这一部分的写法还是需要商榷下
              this.$parent.$compile(cell)

              const _el = $el.children[j].children[i]
              _el.appendChild(cell)
            }
          }
        }
      })
    }
  }
}
</script>
