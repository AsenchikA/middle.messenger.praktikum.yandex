import { assert } from 'chai';
import Chats from '../../pages/chats/chats';
import Login from '../../pages/login/login';
import router from './router';

const { JSDOM } = require("jsdom");

const { window } = new JSDOM(
  ` <html>
    <body>
      <div id="root"></div>
    </body>
    </html>`,
  {
    url: "http://localhost:3000",
  }
);

global.window = window;
global.document = window.document;

describe('Роутер c роутами инициализирован', () => {
  it('Роуты инициализированы', () => {
    router
      .use('/', Chats)
      .use('/login', Login)
      .start();

    assert.equal(router.routes.length, 2);
  });

  it('Работает переход по history', () => {
    router
      .use('/', Chats)
      .use('/login', Login)
      .start();

    router.go('/login');
    assert.deepEqual(window.location.href, 'http://localhost:3000/login');
  });
});
