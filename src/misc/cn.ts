export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined

export interface ClassDictionary {
  [id: string]: any
}

export interface ClassArray extends Array<ClassValue> {}

function toVal(mix: ClassValue) {
  var k,
    y,
    str = ''
  if (mix) {
    if (typeof mix === 'object') {
      for (k in mix) {
        // @ts-ignore
        if (mix[k] && (y = toVal(!!mix.push ? mix[k] : k))) {
          str && (str += ' ')
          str += y
        }
      }
    } else if (typeof mix !== 'boolean') {
      str && (str += ' ')
      str += mix
    }
  }
  return str
}

export function cn(...classes: ClassValue[]) {
  var i = 0,
    x,
    str = ''
  while (i < classes.length) {
    if ((x = toVal(classes[i++]))) {
      str && (str += ' ')
      str += x
    }
  }
  return str
}
