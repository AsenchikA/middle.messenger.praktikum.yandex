const avatarModalTemplate = `
div.avatar-modal
  p.avatar-modal__title Загрузите аватар
  form(method="post", enctype="multipart/form-data")
    div.avatar-modal__input-container
      label(for='file').avatar-modal__input-label Выбрать файл
      input.avatar-modal__input(type='file', id='file', accept='image/*')
    != saveButton
    != cancelButton
`;

export default avatarModalTemplate;
