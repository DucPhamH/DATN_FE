export const cutString = (str, length) => {
  if (str.length > length) {
    return str.slice(0, length) + '...'
  }
  return str
}
