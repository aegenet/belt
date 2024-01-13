import type { FetchContentTypesMapper } from './fetch-content-types-mapper';

/**
 * Get the response (check the content type)
 * @returns T
 */
export async function fetchFormatPayload(response: Response, contentTypes: FetchContentTypesMapper): Promise<unknown> {
  const contentType = response.headers.get('content-type');
  if (contentType) {
    if (contentType.startsWith('text/plain')) {
      return await response.text();
    } else if (contentType.startsWith('application/json')) {
      return await response.json();
    } else {
      for (const ct in contentTypes) {
        if (contentType.startsWith(ct)) {
          return await contentTypes[contentType](response);
        }
      }
    }
  }

  if (!response.status || response.status >= 500) {
    return (await response.text()) || response.statusText || `HTTP error ${response.status}`;
  }

  return await response.text();
}
