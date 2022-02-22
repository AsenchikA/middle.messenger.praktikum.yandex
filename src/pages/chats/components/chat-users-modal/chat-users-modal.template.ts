const chatUsersModalTemplate = `
div.modal
  p.modal__title #{headerText}
  != loginInput
  != button
  != cancelButton
`;

export default chatUsersModalTemplate;
