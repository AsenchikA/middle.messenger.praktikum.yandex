const avatarModalTemplate = `
div.modal
  p.modal__title Загрузите аватар
  form(method="post", enctype="multipart/form-data")
    div.avatar-modal__input-container
      if fileName
        p.avatar-modal__file-name #{fileName}
      else
        label(for='uploadAvatarInput').avatar-modal__input-label Выбрать файл
      != uploadInput
    != saveButton
    != cancelButton
`;

export default avatarModalTemplate;
