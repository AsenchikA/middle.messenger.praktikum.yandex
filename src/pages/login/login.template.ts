const loginTemplate = `
h1.login-form__title Вход
form.login-form__form(action="")
  div.login-form__input-container
    div !{loginField}
    div !{passwordField}
  div.login-form__button-container !{submitButton}
    a(href='/signup').login-form__registration-link Зарегистрироваться
`;

export default loginTemplate;
