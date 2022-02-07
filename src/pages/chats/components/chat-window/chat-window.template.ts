const chatWindowTemplate = `
div.chat-window__header
  div.chat-window__header-name Вадим
div.chat-window__history
  div.chat-window__date 19 июня
  div.chat-window__message.chat-window__message--by-partner
    div.chat-window__message-content Привет
    div.chat-window__message-time 11:56
  div.chat-window__message.chat-window__message--mine
    div.chat-window__message-content Нет
    div.chat-window__message-time 12:00
div.chat-window__footer
  div.chat-window__message-block
    != messageInput
  != sendButton
`;

export default chatWindowTemplate;
