export function isNullOrUndefined(o: any): o is null | undefined {
  return o == null || o == undefined
}
