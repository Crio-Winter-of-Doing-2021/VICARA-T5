import { IObject } from "./interfaces";

export const isObjEmpty = (obj: any): boolean =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const isNull = (value: any): boolean =>
  typeof value === "object" && !value;

export const mapObjToArray = <T extends IObject, TItem extends IObject>(
  obj: T
): Array<TItem> => {
  const k = Object.keys(obj);
  const ret = k.reduce(
    (acc: any, key: string) => [...acc, { id: key, ...obj[key] }],
    []
  );
  return ret;
};

export const convertArrayToObj = <T extends IObject, TObj extends IObject>(
  array: Array<T>,
  key: string
): TObj => {
  const initialState: IObject = {};
  return array.reduce((obj, item) => {
    return { ...obj, [item[key]]: item };
  }, initialState) as TObj;
};

export const splitStringOnUppercase = (string = "") => {
  return string
    .match(/([A-Z]?[^A-Z]*)/g)!
    .slice(0, -1)
    .join(" ");
};

export const deletePropFromObject = <T extends IObject>(
  obj: T,
  prop: string
): T => {
  return Object.keys(obj).reduce((object: any, key: string) => {
    if (key !== prop) {
      object[key] = obj[key];
    }
    return object;
  }, {});
};

export const filterObjOnKey = <T extends IObject>(obj: T, predicate: any): T =>
  Object.keys(obj)
    .filter((key) => predicate(key))
    .reduce((res: any, key: string) => {
      res[key] = obj[key];
      return res;
    }, {});

export const filterObjOnValue = <T extends IObject>(
  obj: T,
  predicate: any
): T =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res: any, key: string) => {
      res[key] = obj[key];
      return res;
    }, {});
// .reduce((res, key) => (res[key] = obj[key], res), {});

export const partitionArray = <T>(array: Array<T>, chunkSize: number) =>
  array
    .map((e, i) => (i % chunkSize === 0 ? array.slice(i, i + chunkSize) : null))
    .filter((e) => e);

export const capitalize = (string = "") =>
  string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const scaleArray = (arr: Array<number>, scaleFactor = 1) =>
  arr.map((x) => x * scaleFactor);

export const range = (start: number, stop: number, step = 1): number[] =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step);

export const handleKeyPress = (
  e: React.KeyboardEvent<HTMLDivElement>,
  callback: any
) => {
  if (e.keyCode === 13) {
    callback();
  }
};
