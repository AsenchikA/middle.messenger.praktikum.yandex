const chatsTemplate = `
nav.sidebar
  div.sidebar__profile-block
    a(href='/profile').sidebar__profile-link Профиль
  div.sidebar__search-box-container
    input(placeholder='Поиск').search-box.sidebar__search-box
  div.chat-list !{chatCard}
main.main-block Выберите чат чтобы отправить сообщение
`;

export default chatsTemplate;