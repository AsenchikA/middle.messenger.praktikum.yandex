function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object'
      && value !== null
      && value.constructor === Object
      && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | Record<string, unknown> {
  return isPlainObject(value) || isArray(value);
}

function cloneDeep<T extends object = object>(obj: T): T {
  if (!isArrayOrObject(obj)) {
    return obj;
  }

  if (isArray(obj)) {
    return obj.map((key) => cloneDeep(key)) as T;
  }

  return Object.fromEntries(
    Object.keys(obj).map((key) => [key, cloneDeep(obj[key] as Partial<T>)]),
  ) as T;
}

export default cloneDeep;
