export function multipleCondition<T>(field: T | T[], callback: (x: T) => boolean) {
  if (Array.isArray(field)) {
    return field.some(callback)
  }
  return callback(field)
}
