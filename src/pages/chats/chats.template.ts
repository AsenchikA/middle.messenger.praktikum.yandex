const chatsTemplate = `
nav.sidebar
  div.sidebar__profile-block
    a(href='/profile').sidebar__profile-link Профиль
  div.sidebar__search-box-container
    input(placeholder='Поиск').search-box.sidebar__search-box
  != chatList
if activeChatId
  main.chat-main.chat-main--with-chat 
    != chatWindow
else
  main.chat-main.chat-main--empty Выберите чат чтобы отправить сообщение
`;

export default chatsTemplate;
