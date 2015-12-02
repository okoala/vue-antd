<template>
<div>
  <ul v-if="simple" :class="`prefixCls + ' ' + prefixCls + '-simple ' + className">
    <li
      title="Previous Page"
      @click="_prev"
      :class="(_hasPrev() ? '' : `${prefixCls}-disabled `) + prefixCls + '-prev'">
      <a></a>
    </li>
    <div title={`Page ${this.state.current} of ${allPages}`} className={`${prefixCls}-simple-pager`}>
      <input type="text"
            value="_current"
            @keydown="_handleKeyDown"
            @keyup="_handleKeyUp"
            @change="_handleKeyUp" />
      <span :class={`${prefixCls}-slash`}>／</span>
      {allPages}
    </div>
    <li title="Next Page"
        @click="_next"
        :class={(this._hasNext() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-next`}>
      <a></a>
    </li>
  </ul>
  <ul v-else
    :class="prefixCls + ' ' + className"
    unselectable="unselectable">
    <li
      title="Previous Page"
      @click="_prev"
      :class={(this._hasPrev() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-prev`}>
      <a></a>
    </li>
    {pagerList}
    <li
      title="Next Page"
      @click="_next"
      :class={(this._hasNext() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-next`}>
      <a></a>
    </li>
    <Options
      :rootPrefixCls={prefixCls}
      :selectComponentClass={selectComponentClass}
      :selectPrefixCls={selectPrefixCls}
      :changeSize={showSizeChanger ? _changePageSize.bind(this) : null}
      :current={current}
      :quickGo={showQuickJumper ? _handleChange.bind(this) : null} />
  </ul>
</div>

</template>

<script>
import Pager from './Pager.vue'
import Options from './Options.vue'
import KEYCODE from './KeyCode'
import { defaultProps } from '../../../utils'

export default {
  props: defaultProps({
    current: 1,
    total: 0,
    simple: false,
    pageSize: 10,
    onChange: () => {,
    className: '',
    selectPrefixCls: 'ant-select',
    prefixCls: 'ant-pagination',
    selectComponentClass: String,
    showQuickJumper: false,
    showSizeChanger: false,
    onShowSizeChange: () => {}
  }),

  data () {
    return {
      _current: null
    }
  }

  methods: {
    _calcPage (pageSize) {
      if (typeof pageSize === 'undefined') {
        pageSize = this.pageSize
      }

      return Math.floor((this.total) - 1 / pageSize) + 1
    },

    _isValid (page) {
      return typeof page === 'number' && page >= 1 && page !== this.state.current
    },

    _handleKeyDown (e) {
      if (e.keyCode === KEYCODE.ARROW_UP || e.keyCode === KEYCODE.ARROW_DOWN) {
        e.preventDefault()
      }
    },

    _handleKeyUp (e) {
      const _val = e.target.value
      let val

      if (_val === '') {
        val = _val
      } else if (isNaN(Number(_val))) {
        val = this._current
      } else {
        val = Number(_val)
      }

      this._current = val

      if (e.keyCode === KEYCODE.ENTER) {
        this._handleChange(val)
      } else if (e.keyCode ===  KEYCODE.ARROW_UP) {
        this._handleChange(val - 1)
      } else if (e.keyCode === KEYCODE.ARROW_DOWN) {
        this._handleChange(val + 1)
      }
    },

    _changePageSize (size) {
      if (typeof size === 'number') {
        let current = this.current
        this.pageSize = size

        if (this.current > this._calcPage(size)) {
          current = this._calcPage(size)
          this.current = current
          this._current = current
        }

        this.onShowSizeChange(current, size)
      }
    },

    _handleChange (page) {
      let _page = page

      if (this._isValid(_page)) {
        if (_page > this._calcPage()) {
          _page = this._calcPage()
        }

        this.current = page
        this._current = page
        this.onChange(_page)

        return _page
      }

      return this.current
    },

    _prev() {
      if (this._hasPrev()) {
        this._handleChange(this.current - 1)
      }
    },

    _next() {
      if (this._hasNext()) {
        this._handleChange(this.current + 1)
      }
    },

    _jumpPrev() {
      this._handleChange(Math.max(1, this.current - 5));
    },

    _jumpNext() {
      this._handleChange(Math.min(this._calcPage(), this.current + 5));
    },

    _hasPrev() {
      return this.current > 1;
    },

    _hasNext() {
      return this.current < this._calcPage();
    }
  }
}

</script>
