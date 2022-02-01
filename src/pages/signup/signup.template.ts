const signupTemplate = `
h1.signup-form__title Регистрация
form.signup-form__form(action="")
  div.signup-form__input-container
    div !{emailInput}
    div !{loginInput}
    div !{firstNameInput}
    div !{secondNameInput}
    div !{phoneInput}
    div !{passwordInput}
    div !{secondPasswordInput}
  div.signup-form__button-container !{submitButton}
    a(href='/login').signup-form__registration-link Войти
`;

export default signupTemplate;
