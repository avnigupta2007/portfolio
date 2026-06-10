export function cn(...inputs: any[]): string {
  return inputs
    .flat(Infinity)
    .filter((input) => typeof input === 'string' && input.trim() !== '')
    .join(' ');
}
