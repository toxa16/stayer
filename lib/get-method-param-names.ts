/**
 * Obtains parameter names of a function.
 * @param fn
 * @returns {string[]}
 */
export default function getMethodParamNames(fn: Function): string[] {
  const fstr = fn.toString();
  const result = fstr.match(/\(.*?\)/)[0].replace(/[()]/gi,'')
  .replace(/\s/gi,'').split(',');
  if (result.length == 1 && result[0] === '') {
    return []
  } else {
    return result;
  }
}