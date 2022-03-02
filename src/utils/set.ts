import cloneDeep from './cloneDeep';

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

  const resultObj = { ...lhs };

  Object.keys(rhs).forEach((key) => {
    if (isPlainObject(rhs[key]) && Object.prototype.hasOwnProperty.call(lhs, key)) {
      resultObj[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed);
    } else {
      resultObj[key] = rhs[key];
    }
  });

  return resultObj;
}

function set(object: Indexed, path: string, value: unknown): Indexed | Error {
  if (typeof path !== 'string') {
    return new Error();
  }
  if (typeof object !== 'object') {
    return object;
  }

  const objWithNewValue = path.split('.').reduceRight((obj, currentValue) => ({ [currentValue]: obj }), value) as Indexed;

  if (object === null) {
    return objWithNewValue;
  }

  const result = merge(object as Indexed, objWithNewValue as Indexed);
  return result;
}

export default set;
