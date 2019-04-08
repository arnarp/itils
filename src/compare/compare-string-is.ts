const alphabetIndexMap = new Map()
const alphabetArr = ' -.,0123456789aábcdðeéfghiíjklmnoópqrstuúvwxyýzþæö'.split(
  ''
)
let nextIndex = 1
alphabetArr.forEach(char => {
  alphabetIndexMap.set(char, nextIndex)
  nextIndex += 1
  if (char.toUpperCase() !== char) {
    alphabetIndexMap.set(char.toUpperCase(), nextIndex)
    nextIndex += 1
  }
})

/**
 * CompareFn to use in Array.sort
 */
export function compareStringIS(a: string, b: string) {
  // same word? exit early
  const aLength = a.length
  const bLength = b.length
  if (aLength === bLength && a === b) {
    return 0
  }
  // char by char evaluation
  const minLength = Math.min(aLength, bLength)
  for (let i = 0; i < minLength; i += 1) {
    const charA = a[i]
    const charB = b[i]
    const aIndex = alphabetIndexMap.get(charA)
    const bIndex = alphabetIndexMap.get(charB)
    // because alphabetIndexMap has a 1 based index, any falsy value means "undefined" character
    if (!aIndex || !bIndex) {
      // either char is not defined: we can JS sort them
      return charA.localeCompare(charB)
    } else if (aIndex !== bIndex) {
      // it's not the same char, go by value
      return aIndex - bIndex
    }
  }
  // words are not identical but didn't sort: this must be the same word but casing is different!
  if (aLength === bLength) {
    if (a > b) {
      return -1
    }
    return a < b ? 1 : 0
  }
  // words are not identical, so the longer one is the shorter+suffix
  return aLength - bLength
}
