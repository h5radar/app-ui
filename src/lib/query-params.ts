/**
 * Create query params.
 *
 * @param params - input values: page, size per page, sort (["title", "asc"])
 * @returns params for URL
 */
export function createQueryParams(params: Record<string, string | number | boolean | string[]>) {
  const result = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    result.append(key, String(value));
  });
  return result;
}
