<tempalte>
<Calendar></Calendar>
</tempalte>

<script>
import { defaultProps } from '../utils'
import Calendar from './base/calendar'
import GregorianCalendar from 'gregorian-calendar'
import zhCn from 'gregorian-calendar/lib/locale/zh-cn'
import CalendarLocale from './base/calendar/locale/zh-cn'

// 和顶部文案保持一致
import Locale from 'gregorian-calendar-format/lib/locale/zh-cn'
Locale.shortMonths = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月'
]

// 以下两行代码
// 给没有初始值的日期选择框提供本地化信息
let defaultCalendarValue = new GregorianCalendar(zhCn)
defaultCalendarValue.setTime(Date.now())

export default {
  props: defaultProps({
    locale: CalendarLocale,
    prefixCls: 'ant-calendar'
  }),
  components: { Calendar }
}

</script>
