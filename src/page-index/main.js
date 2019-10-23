require('normalize.css/normalize.css')
require('../css/shared.css')
require('./page.css')

export const log = (() => {
  if (process.env.NODE_ENV !== 'production') {
    const context = ['%cSLEEPINGDUDE.COM_LOG:', 'color: grey']
    return Function.prototype.bind.call(console.log, console, ...context)
  } else {
    return () => {}
  }
})()

document.addEventListener('DOMContentLoaded', () => {
  log('DOMContentLoaded')
})
