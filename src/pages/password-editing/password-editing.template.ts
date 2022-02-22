const passwordEditingTemplate = `
!= backPanel
main.profile-block-container
  div.profile-block
    img(src=avatarUrl).profile-block__static-avatar
    p.profile-block__name #{userName}
    div.profile-block__info
      ul.profile-block__info-list
        li.profile-block__info-item
          span.profile-block__info-label Старый пароль
          div.profile-block__input-container
            != oldPasswordInput
        li.profile-block__info-item
          span.profile-block__info-label Новый пароль
          div.profile-block__input-container
            != newPasswordInput
        li.profile-block__info-item
          span.profile-block__info-label Повторите новый пароль
          div.profile-block__input-container
            != duplicateNewPasswordInput
    div.profile-block__button-block
      != submitButton
`;

export default passwordEditingTemplate;
