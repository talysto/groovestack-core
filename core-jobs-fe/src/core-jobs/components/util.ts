// source: https://programming.guide/java/formatting-byte-size-to-human-readable-format.html
export function numberToHuman(num: number, withSpace = true) {
  if (-1000 < num && num < 1000) {
    return num
  }
  var ci = 'KMGTPE'[Symbol.iterator]()
  while (num <= -999950 || num >= 999950) {
    num /= 1000
    ci.next()
  }
  return (num / 1000.0).toFixed(1) + (withSpace ? ' ' : '') + ci.next().value
}
