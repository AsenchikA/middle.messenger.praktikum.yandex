const signupTemplate = `
h1.signup-form__title Регистрация
form.signup-form__form(action="")
  div.signup-form__input-container
    != emailInput
    != loginInput
    != firstNameInput
    != secondNameInput
    != phoneInput
    != passwordInput
    != secondPasswordInput
  div.signup-form__button-container
    != submitButton
    a(href='/login').signup-form__registration-link Войти
`;

export default signupTemplate;
