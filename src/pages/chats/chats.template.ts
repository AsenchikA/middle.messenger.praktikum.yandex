const chatsTemplate = `
nav.sidebar
  div.sidebar__profile-block
    != profileButton
  != chatList
  div.sidebar__creating-chat-block
    != nameInput
    != createButton
if activeChatId
  main.chat-main.chat-main--with-chat 
    != chatWindow
else
  main.chat-main.chat-main--empty Выберите чат чтобы отправить сообщение
`;

export default chatsTemplate;
