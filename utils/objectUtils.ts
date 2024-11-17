export const omit = <T extends Record<string, any>, K extends keyof T>(
  object: T,
  keysToOmit: K[] | any[]
): Pick<T, Exclude<keyof T, K>> => {
  const result = { ...object };

  for (const key of keysToOmit) {
    delete result[key];
  }

  return result;
};

export const getValueByPath = (
  obj: Record<string, any>,
  path: string | (string | number)[],
  defaultValue?: any
): any => {
  if (typeof path === "string") {
    path = path.split(".").map((key) => {
      const num = Number(key);
      return Number.isNaN(num) ? key : num;
    });
  }

  let result = obj;

  for (const key of path) {
    if (result === undefined || result === null) {
      return defaultValue;
    }

    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
};
