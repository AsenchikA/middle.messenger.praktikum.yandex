# Учебный проект Яндекс.Практикум

Проект создан на основе [макета в Figma от Яндекса](https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1)

[Веб-хостинг в Netlify](https://clever-leavitt-22bd57.netlify.app)

[Веб-хостинг на Heroku](https://praktikum-messenger-again.herokuapp.com/)

## Используемые инструменты

- Webpack и Docker для сборки проекта
- шаблонизатор Pug
- локальная раздача статики через Express
- PostCSS с плагинами autoprefixer, cssnano, postcss-nested
- husky на precommit
- веб-хостинги Netlify и Heroku
- линтинг кода ESLint, Stylelint
- тестирование с помощью Chai, Mocha

## Используемые команды

- `npm install` — установка стабильной версии,
- `npm run dev` — запуск проекта локально,
- `npm run build` — сборка проекта,
- `npm run start` — сборка проекта и запуск express-сервера на 3000 порту,
- `npm run lint` — линтинг проекта,
- `npm run test` — запуск тестов.

[Pull request, sprint 4](https://github.com/AsenchikA/middle.messenger.praktikum.yandex/pull/4)