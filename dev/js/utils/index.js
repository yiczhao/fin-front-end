export {camelcaseToHyphen,camelize,strToObj,throttle} from './lang'
export {inBrowser,isIE9} from './env'
export {addClass,removeClass,addStyle,insertBefore,insertAfter,contains,getTrustSlotNode} from './dom'
export {defaultProps,oneOfType,oneOf,any} from './props'
export {addEventListener,addEndEventListener,removeEndEventListener} from './event'
export {guid} from './guid'

import _cx from 'classnames'
import _KeyCode from './KeyCode'
import _slotMixin from './slotMixin'
export const cx = _cx
export const KeyCode = _KeyCode
export const slotMixin = _slotMixin

export function getPlainObject (vueObject) {
  return JSON.parse(JSON.stringify(vueObject))
}
