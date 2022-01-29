import Chats from "./pages/chats/chats";
import Login from "./pages/login/login";
import NotFound from "./pages/not-found/not-found";
import Profile from "./pages/profile/profile";
import ServerError from "./pages/server-error/server-error";
import Signup from "./pages/signup/signup";
import { render } from "./utils/render-DOM";

const loginPage = new Login();
const signupPage = new Signup();
const notFoundPage = new NotFound();
const unavailablePage = new ServerError();
const profilePage = new Profile();
const chatsPage = new Chats();

switch (document.location.pathname) {
  case '/':
  case '/login':
    render('#root', loginPage);
    break;
  case '/signup':
    render('#root', signupPage);
    break;
  case '/profile':
    render('#root', profilePage);
    break;
  case '/chats':
    render('#root', chatsPage);
    break;
  case '/unavailable':
    render('#root', unavailablePage);
    break;
  default:
    render('#root', notFoundPage);
}