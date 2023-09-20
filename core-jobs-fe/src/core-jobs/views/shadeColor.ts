// function that takes a hex color string and integer shade value and returns a hex color string
// const shadeColor = (color: string, percent: number) => {
export function shadeColor(color: string, decimal: number): string {
  const base = color.startsWith('#') ? 1 : 0

  let r = parseInt(color.substring(base, 3), 16)
  let g = parseInt(color.substring(base + 2, 5), 16)
  let b = parseInt(color.substring(base + 4, 7), 16)

  r = Math.round(r / decimal)
  g = Math.round(g / decimal)
  b = Math.round(b / decimal)

  r = r < 255 ? r : 255
  g = g < 255 ? g : 255
  b = b < 255 ? b : 255

  const rr = r.toString(16).length === 1 ? `0${r.toString(16)}` : r.toString(16)
  const gg = g.toString(16).length === 1 ? `0${g.toString(16)}` : g.toString(16)
  const bb = b.toString(16).length === 1 ? `0${b.toString(16)}` : b.toString(16)

  return `#${rr}${gg}${bb}`
}
