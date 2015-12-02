const now = Date.now()

export default {
  noop () {},

  getKeyFromChildrenIndex (child, menuEventKey, index) {
    const prefix = menuEventKey || ''
    return child.key || prefix + 'item_' + now + '_' + index
  }
}
