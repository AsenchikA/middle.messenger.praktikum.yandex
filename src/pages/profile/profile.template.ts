const profileTemplate = `
div.back-block
  a(href='/').back-block__button
main.profile-block-container
  div.profile-block
    != avatarBlock
    p.profile-block__name #{display_name}
    div.profile-block__info
      ul.profile-block__info-list
        li.profile-block__info-item
          span.profile-block__info-label Почта
          span.profile-block__info-value #{email}
        li.profile-block__info-item
          span.profile-block__info-label Логин
          span.profile-block__info-value #{login}
        li.profile-block__info-item
          span.profile-block__info-label Имя
          span.profile-block__info-value #{first_name}
        li.profile-block__info-item
          span.profile-block__info-label Фамилия
          span.profile-block__info-value #{second_name}
        li.profile-block__info-item
          span.profile-block__info-label Имя в чате
          span.profile-block__info-value #{display_name}
        li.profile-block__info-item
          span.profile-block__info-label Телефон
          span.profile-block__info-value #{phone}
    div.profile-block__button-block
      ul.profile-block__button-list
        li.profile-block__button-item
          != editButton
        li.profile-block__button-item
          != logoutButton
if isModalVisible
  != avatarModal
`;

export default profileTemplate;
