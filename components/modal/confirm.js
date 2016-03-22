import Vue from 'vue'
import Dialog from '../base/dialog'
import vIcon from '../iconfont'
import vButton from '../button'
import { guid } from '../../utils'

export default function (props) {
  props = props || {}
  props.iconClassName = props.iconClassName || 'question-circle'
  props.width = (props.width || 416) + 'px'
  props.visible = true

  // 默认为 true，保持向下兼容
  if (!('okCancel' in props)) {
    props.okCancel = true
  }

  let fragmentNode = {
    create () {
      let div = document.createElement('div')
      fragmentNode.id = div.id = guid()
      document.body.appendChild(div)

      return div
    },

    remove () {
      if (fragmentNode.id) {
        const el = document.getElementById(fragmentNode.id)
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }

  const container = fragmentNode.create()

  const _Dialog = Vue.extend({
    template: `
      <div>
        <dialog
          title=""
          prefix-cls="ant-modal"
          class-name="ant-confirm"
          transition-name="zoom"
          :visible="visible"
          :closeable="false"
          :has-footer="false"
          :on-close="_handleCancel"
          :mask-transition-name="'fade'"
          :style="{'width': width}">
          <div style="zoom: 1; overflow: hidden">
            <div class="ant-confirm-body">
              <v-icon :type="iconClassName"></v-icon>
              <span class="ant-confirm-title">{{title}}</span>
              <div class="ant-confirm-content">{{content}}</div>
            </div>
            <span> </span>
            <div class="ant-confirm-btns" v-if="!okCancel">
              <v-button :type="'primary'" :size="'large'" @click="_handleOk">知道了</v-button>
            </div>
            <div class="ant-confirm-btns" v-else>
              <v-button :type="'ghost'" :size="'large'" @click="_handleCancel">取 消</v-button>
              <v-button :type="'primary'" :size="'large'" @click="_handleOk">确 定</v-button>
            </div>
          </div>
        </dialog>
      </div>
    `,

    components: { Dialog, vIcon, vButton }
  })

  // TODO: avoid new
  new _Dialog({ // eslint-disable-line
    el: container,
    data: props,
    methods: {
      _close () {
        this.visible = false
        setTimeout(() => {
          fragmentNode.remove()
        }, 1500)
      },

      _handleOk () {
        let okFn = this.onOk

        if (okFn) {
          let ret = okFn()
          if (ret && ret.then) {
            ret.then(this._close)
          } else {
            this._close()
          }
        } else {
          this._close()
        }
      },

      _handleCancel () {
        let cancelFn = this.onCancel

        if (cancelFn) {
          let ret = cancelFn()
          if (ret && ret.then) {
            ret.then(this._close)
          } else {
            this._close()
          }
        } else {
          this._close()
        }
      }
    }
  })
}
