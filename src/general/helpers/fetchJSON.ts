import {API_DEFAULT} from '../../constants/api';
import ensureObject from './ensureObject';
import errorMessageCollection from '../../constants/errorMessage';

type FetchJSON = (url: string, options: FetchOptions) => Promise<FetchReturn>;
type FetchReturn = {[key: string]: string};
type FetchOptions = {
  method?: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'HEAD' | 'OPTIONS';
  headers?: {[key: string]: string};
  body?: string | FormData;
};

// The following types describe built-in globals.
type Headers = {
  get: (key: string) => string | null;
};
type Response = {
  status: number;
  ok: boolean;
  statusText: string;
  headers: Headers;
  json: () => Promise<{[key: string]: string}>;
  text: () => Promise<string>;
};
type Fetch = (url: string, options: FetchOptions) => Promise<Response>;

export function createFetchJSON(fetch: Fetch): FetchJSON {
  let fetchJSON = async (
    url: string,
    options: FetchOptions,
    apiHost: string = API_DEFAULT,
  ) => {
    let response: Response | void = await fetch(
      `${apiHost}${url}`,
      options,
    ).catch((error) => {
      if (error.message === 'Failed to fetch') {
        let customError = {
          message: errorMessageCollection.failedToFetch,
        };
        throw customError;
      }
    });

    if (response) {
      let contentTypeRaw = response.headers.get('Content-Type') || '';
      let contentType = contentTypeRaw.split(';')[0].toLowerCase().trim();
      let isJSON = contentType === 'application/json';
      let body: {[key: string]: string};
      if (isJSON) {
        let data = await response.json();
        body = ensureObject(data) || {_: data};
      } else {
        let text = await response.text();
        body = {responseText: text};
      }
      if (!response.ok) {
        let serverMessage =
          typeof body.message === 'string' ? body.message : null;
        let errorMessage =
          serverMessage || `Unexpected response status: ${response.status}`;
        let error: Object = {
          message: errorMessage,
          status: response.status,
          statusText: response.statusText,
        };
        throw error;
      }
      return body;
    } else {
      let noResponseError: Object = {
        message: 'No reponse object',
      };
      throw noResponseError;
    }
  };
  return fetchJSON;
}

export default createFetchJSON(global.fetch);
