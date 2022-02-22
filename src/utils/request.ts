import router from "./router/router";

export enum METHOD_TYPES {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

interface IOptions {
  method: METHOD_TYPES,
  headers?: Record<string, string>,
  data?: Document | XMLHttpRequestBodyInit;
  timeout?: number;
  withoutContentType?: boolean;
}

function queryStringify(queryObj: Record<string, unknown>) {
  const keys = Object.keys(queryObj);
  return keys.reduce((result, key, index) => `${result}${key}=${queryObj[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export class HTTPTransport {
  private _baseUrl = 'https://ya-praktikum.tech/api/v2';

  constructor(instanceUrl: string) {
    this._baseUrl = `${this._baseUrl}${instanceUrl}`;
  }

  public get = (url: string, options: IOptions = { method: METHOD_TYPES.GET }) => this.request(url, options);

  public put = (url: string, body: any, options: IOptions = { method: METHOD_TYPES.PUT }) => this.request(url, options, body);

  public post = (url: string, body?: any, options: IOptions = { method: METHOD_TYPES.POST }) => this.request(url, options, body);

  public delete = (url: string, body: any, options: IOptions = { method: METHOD_TYPES.DELETE }) => this.request(url, options, body);

  public request = (url: string, options: IOptions, body: any = null, queryObj: Record<string, unknown> = {}) => {
    const {
      method, timeout, headers,
    } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      let fullUrl = `${this._baseUrl}${url}`;

      if (Object.keys(queryObj).length > 0) {
        fullUrl = `${fullUrl}${queryStringify(queryObj)}`;
      }

      xhr.open(method, fullUrl);

      if (timeout) {
        xhr.timeout = timeout;
      }

      const validHeaders: Record<string, string> = {
        ...headers,
        'Content-Type': 'application/json;charset=UTF-8',
      };

      if (options.withoutContentType) {
        delete validHeaders['Content-Type'];
      }

      Object.keys(validHeaders).forEach((key) => {
        xhr.setRequestHeader(key, validHeaders[key]);
      });

      xhr.withCredentials = true;

      xhr.onload = () => {
        const statusCode = xhr.status;

        if (statusCode >= 200 && statusCode < 300) {
          resolve(xhr.response);
        }
        if (statusCode === 401) {
          router.go('/login');
          reject();
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.ontimeout = reject;

      if (method === METHOD_TYPES.GET || !body) {
        xhr.send();
      } else if (validHeaders['Content-Type'] === 'application/json;charset=UTF-8') {
        xhr.send(JSON.stringify(body));
      } else {
        xhr.send(body);
      }
    });
  };
}
