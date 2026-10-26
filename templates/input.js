'use strict';
// Copy this function into the <script> of each standalone HTML game.
// event.code is the physical key, independent of Russian/English layout.
const KEY_CODES = Object.freeze({
  KeyW:'up', KeyA:'left', KeyS:'down', KeyD:'right',
  ArrowUp:'up', ArrowLeft:'left', ArrowDown:'down', ArrowRight:'right',
  KeyQ:'ability', KeyE:'interact', KeyG:'gravity',
  Space:'secondary', ShiftLeft:'sneak', ShiftRight:'sneak',
  Escape:'pause', KeyP:'pause', Enter:'confirm'
});
const KEY_FALLBACK = Object.freeze({
  w:'up', a:'left', s:'down', d:'right',
  '\u0446':'up', '\u0444':'left', '\u044b':'down', '\u0432':'right',
  arrowup:'up', arrowleft:'left', arrowdown:'down', arrowright:'right',
  q:'ability', '\u0439':'ability', e:'interact', '\u0443':'interact',
  g:'gravity', '\u043f':'gravity',
  ' ':'secondary', spacebar:'secondary',
  shift:'sneak', escape:'pause', p:'pause', enter:'confirm'
});
function actionForKeyEvent(event) {
  if (!event || typeof event !== 'object') return null;
  const code = typeof event.code === 'string' ? event.code : '';
  if (Object.prototype.hasOwnProperty.call(KEY_CODES, code)) return KEY_CODES[code];
  const key = typeof event.key === 'string' ? event.key.toLowerCase() : '';
  return Object.prototype.hasOwnProperty.call(KEY_FALLBACK, key) ? KEY_FALLBACK[key] : null;
}
if (typeof module !== 'undefined' && module.exports) module.exports = {actionForKeyEvent};
