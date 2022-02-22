const contextMenuTemplate = `
!= menuButton
if isMenuVisible
  div.context-menu__menu
    != addUserButton
    != removeUserButton
    != removeChatButton
`;

export default contextMenuTemplate;
