/**
 * 是否有权限
 * @param key
 * @returns {boolean}
 * @constructor
 */
export function Auth (key) {
  let arr = sessionStorage.getItem('permissions').split(',');
  return arr.includes(key);
}

