import Vue from 'vue'
import vModal from './Modal.vue'
import vIcon from '../iconfont'
import vButton from '../button'

let fragmentNode = {
  create () {
    let div = document.createElement('div')
    document.body.appendChild(div)
    fragmentNode.el = div

    return div
  },

  remove () {
    fragmentNode.el && fragmentNode.el.parentNode.remvoeChild(fragmentNode.el)
  }
}

export default function (props) {
  props = props || {}
  props.iconClassName = props.iconClassName || 'question-circle'
  props.width = props.width || 416

  // 默认为 true，保持向下兼容
  if (!('okCancel' in props)) {
    props.okCancel = true
  }

  const container = fragmentNode.create()

  const Dialog = Vue.extend({
    template: `
      <v-modal
        :prefixCls="'ant-modal'"
        :classNmae="'ant-confirm'"
        :visible="true"
        :closeable="false"
        :title="''"
        :transitionName="'zoom'"
        :footer="''"
        :maskTransitionName="'fade'"
        :width="width">
        <div style="zoom: 1; overflow: 'hidden'">
          <div class="ant-confirm-body">
            <v-icon :type="iconClassName"></v-icon>
            <span class="ant-confirm-title">{{title}}</span>
            <div class="ant-confirm-content">{{content}}</div>
          </div>
          <div slot="footer" class="ant-confirm-btns" v-if="!okCancel">
            <v-button :type="'primary'" :size="'large'" :on-click="_handleOk">知道了</v-button>
          </div>
          <div slot="footer" className="ant-confirm-btns" v-else>
            <v-button :type="'ghost'" :size="'large'" :on-click="_handleCancel">取 消</v-button>
            <v-button :type="'primary'" :size="'large'" :on-click="_handleOk">确 定</v-button>
          </div>
        </div>
      </v-modal>
    `,

    components: { vModal, vIcon, vButton }
  })

  new Dialog({
    el: container,
    data: props,
    methods: {
      _close () {
        this.visible = false
        fragmentNode.remove()
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

