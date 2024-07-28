import type { FetchContentTypesMapper } from './fetch-content-types-mapper';
import { fetchFormatPayload } from './fetch-format-payload';

/**
 * Fetch Ensure
 *
 * Throw an unknown object (not an error) if the response is not ok
 */
export async function fetchEnsure<T = unknown>(
  response: Response,
  contentTypes: FetchContentTypesMapper = {}
): Promise<T> {
  const resp = await fetchFormatPayload(response, contentTypes);
  if (response.ok) {
    return resp as unknown as T;
  } else {
    throw resp;
  }
}
