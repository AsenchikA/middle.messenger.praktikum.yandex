import { expect } from 'chai';
import * as sinon from 'sinon';
import { HTTPTransport } from './request';

const testApi = new HTTPTransport('');

describe('Проверка подключения к api', () => {
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    (global as any).XMLHttpRequest = sinon.useFakeXMLHttpRequest();
    const xhr: sinon.SinonFakeXMLHttpRequestStatic = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = ((request: sinon.SinonFakeXMLHttpRequest): void => {
      requests.push(request);
    });
  });

  it('Проверка GET метода', () => {
    testApi.get('/');

    expect(requests.length).to.eq(1);
    expect(requests[0].method).to.eq('GET');
  });

  it('Проверка POST метода', () => {
    testApi.post('/');

    expect(requests.length).to.eq(1);
    expect(requests[0].method).to.eq('POST');
  });

  it('Использование DELETE метода', () => {
    testApi.delete('/', {});

    expect(requests.length).to.eq(1);
    expect(requests[0].method).to.eq('DELETE');
  });

  it('Использование PUT метода', () => {
    testApi.put('/', {});

    expect(requests.length).to.eq(1);
    expect(requests[0].method).to.eq('PUT');
  });

  afterEach(() => {
    (global as any).XMLHttpRequest.restore();
    requests.length = 0;
  });
});
