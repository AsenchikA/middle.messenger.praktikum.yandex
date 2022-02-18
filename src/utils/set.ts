import cloneDeep from "./cloneDeep";

type Indexed<T = unknown> = {
  [key in string]: T;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  if (lhs === null) {
    return cloneDeep(rhs);
  }

  Object.keys(rhs).forEach((key) => {
    if (isPlainObject(rhs[key]) && lhs.hasOwnProperty(key)) {
      lhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
    } else {
      lhs[key] = rhs[key];
    }
  });

  return lhs;
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    return new Error();
  }
  if (typeof object !== 'object') {
    return object;
  }

  const objWithNewValue = path.split('.').reduceRight((obj, currentValue) => ({ [currentValue]: obj }), value);

  if (object === null) {
    return objWithNewValue;
  }

  const result = merge(object as Indexed, objWithNewValue as Indexed);
  return result;
}

export default set;
