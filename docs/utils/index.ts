export const renderObject = (obj: any): string => {
  if (Array.isArray(obj)) {
    return `[${obj.map(renderObject).join(', ')}]`
  }

  if (typeof obj === 'object') {
    return `{ ${Object.entries(obj)
      .map(([key, value]) => `${key}: ${renderObject(value)}`)
      .join(', ')} }`
  }

  if (typeof obj === 'string') {
    return `'${obj}'`
  }

  return obj
}
