export function createComponent<N extends string, T>(name: N, data: T): { [key in N]: T } {
  return { [name]: data } as { [key in N]: T };
}
