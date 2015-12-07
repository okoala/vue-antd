import vMenu from './Menu.vue'
import vMenuItem from '../base/menu/MenuItem.vue'
import vSubMenu from '../base/menu/SubMenu.vue'
import vDivider from '../base/menu/Divider.vue'

vMenu.vMenuItem = vMenuItem
vMenu.vSubMenu = vSubMenu
vMenu.vDivider = vDivider

export default vMenu

