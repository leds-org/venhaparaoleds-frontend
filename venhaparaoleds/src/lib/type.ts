export function ensureString(str: string | string[]): string {
  if (typeof str === 'object') {
    return str[0]
  }

  return str
}

export function ensureStringArray(str: string | string[]): string[] {
  if (typeof str === 'string') {
    return [str]
  }

  return str
}