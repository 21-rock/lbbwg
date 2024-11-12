export function getImageUrl(file: string) {
  return new URL(`./images/${file}`, import.meta.url).href
}
export function getIconUrl(file: string) {
  return new URL(`./icons/${file}`, import.meta.url).href
}
