const profileTemplate = `
div.back-block
  a(href='/').back-block__button
main.profile-block-container
  div.profile-block
    div.profile-block__avatar
    p.profile-block__name Иван
    div.profile-block__info
      ul.profile-block__info-list
        li.profile-block__info-item
          span.profile-block__info-label Почта
          span.profile-block__info-value pochta@mail.ru
        li.profile-block__info-item
          span.profile-block__info-label Логин
          span.profile-block__info-value ivanivanov
        li.profile-block__info-item
          span.profile-block__info-label Имя
          span.profile-block__info-value Иван
        li.profile-block__info-item
          span.profile-block__info-label Фамилия
          span.profile-block__info-value Иванов
        li.profile-block__info-item
          span.profile-block__info-label Имя в чате
          span.profile-block__info-value Иван
        li.profile-block__info-item
          span.profile-block__info-label Телефон
          span.profile-block__info-value +7 (909) 967 30 30
    div.profile-block__button-block
      ul.profile-block__button-list
        li.profile-block__button-item
          a.profile-block__edit-button Изменить данные
        li.profile-block__button-item
          a.profile-block__edit-button Изменить пароль
        li.profile-block__button-item
          a.profile-block__close-button Выйти
`;

export default profileTemplate;