export const roundNumberByStep = (value: number, step: number): number => {
  return Math.round(value / step) * step;
}
