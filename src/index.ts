import Chats from './pages/chats/chats';
import Login from './pages/login/login';
import NotFound from './pages/not-found/not-found';
import ProfileEditing from './pages/profile-editing/profile-editing';
import PasswordEditing from './pages/password-editing/password-editing';
import Profile from './pages/profile/profile';
import ServerError from './pages/server-error/server-error';
import Signup from './pages/signup/signup';
import router from './utils/router/router';
import './index.css';

router
  .use('/', Chats)
  .use('/chats', Chats)
  .use('/login', Login)
  .use('/signup', Signup)
  .use('/profile', Profile)
  .use('/profile-editing', ProfileEditing)
  .use('/password-editing', PasswordEditing)
  .use('/unavailable', ServerError)
  .setReserveRoute('/not-found', NotFound)
  .start();
