/**
 * Creates an enum-like array of values from an array of options.
 * The resulting array would be acceptable by the z.enum() method
 * Inspired by: https://stackoverflow.com/a/73825370
 * @param options - The array of options with a `value` property.
 * @returns An array of values extracted from the `value` property of each option.
 */
export function createEnumFromOptions<T extends { value: V }, V>(
  options: T[]
): V[] {
  type Option = (typeof options)[number]['value'];
  const VALUES: [Option, ...Option[]] = [
    options[0].value,
    ...options.slice(1).map(p => p.value),
  ];

  return VALUES as [Option, ...Option[]];
}


export const formatValue = (value: number) => {
  if (value >= 1_000_000_000_000) { // Trillions
    return `${(value / 1_000_000_000_000).toFixed(1)}T`;
  } else if (value >= 1_000_000_000) { // Billions
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  } else if (value >= 1_000_000) { // Millions
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) { // Thousands
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toLocaleString();
};
