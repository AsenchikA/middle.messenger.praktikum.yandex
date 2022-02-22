const chatWindowTemplate = `
div.chat-window__header
  div.chat-window__name-block
    if avatarUrl
      img(src=avatarUrl).chat-window__avatar
    else
      div.chat-window__avatar
    div.chat-window__header-name #{title}
  != contextMenu
div.chat-window__history
  div.chat-window__date 19 июня
  each val in messageList
    if val.isMine
      div.chat-window__message.chat-window__message--mine
        div.chat-window__message-content= val.content
        div.chat-window__message-time= val.time
    else
      div.chat-window__message.chat-window__message--by-partner
        div.chat-window__message-content= val.content
        div.chat-window__message-time= val.time
div.chat-window__footer
  div.chat-window__message-block
    != messageInput
  != sendButton
if isAddUserModalVisible
  != addUserModal
if isRemoveUserModalVisible
  != removeUserModal
`;

export default chatWindowTemplate;
