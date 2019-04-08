/**
 * Returns a random v4 UUID of the form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx,
 * where each x is replaced with a random hexadecimal digit from 0 to f,
 * and y is replaced with a random hexadecimal digit from 8 to b.
 * @param a Placeholder
 */
export function uuid(a?: string): string {
  return a // if the placeholder was passed, return
    ? // a random number from 0 to 15

      (
        (a as any) ^ // unless b is 8,
        ((Math.random() * // in which case
          16) >> // a random number from
          ((a as any) / 4))
      ) // 8 to 11
        .toString(16) // in hexadecimal
    : // or otherwise a concatenated string:
      ((((([1e7] as any) as number) + // 10000000 +
      -1e3 + // -1000 +
      -4e3 + // -4000 +
      -8e3 + // -80000000 +
        -1e11) as any) as string) // -100000000000,
        .replace(
          // replacing
          /[018]/g, // zeroes, ones, and eights with
          uuid // random hex digits
        )
}
