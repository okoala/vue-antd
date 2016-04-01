/* global describe, it, expect */

import Vue from 'vue'
import Menu from '../../../components/base/menu'

describe('Base.Menu', () => {
  beforeEach(() => {

  })

  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><menu></menu></div>',
      components: { Menu }
    }).$mount()
    expect(vm.$el.querySelector(''))
  })

  it('Should call on select when item is selected', (done) => {

  })

})
