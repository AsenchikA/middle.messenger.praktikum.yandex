import Button, { EButtonAppearance } from '../../../src/components/button/button';
import authController from '../../../src/controllers/auth-controller';
import { IFullUserModel } from '../../../src/types';
import Block from '../../../src/utils/block/block';
import connect from '../../../src/utils/connect';
import router from '../../../src/utils/router/router';
import { IRootState } from '../../../src/utils/store';
import Avatar from './components/avatar/avatar';
import AvatarModal from './components/avatar-modal/avatar-modal';
import profileTemplate from './profile.template';
import isEqual from '../../../src/utils/is-equal';
import BackPanel from '../../../src/components/back-panel/back-panel';
import './profile.css';

interface IMapStateToProps {
  userModel: IFullUserModel | null,
}

class Profile extends Block<IMapStateToProps> {
  constructor(props: IMapStateToProps) {
    super('div', props);
    authController.getUser();
  }

  public componentDidUpdate(oldProps: IMapStateToProps, newProps: IMapStateToProps): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.children.avatarBlock.setProps({
        url: this.props.userModel ? `https://ya-praktikum.tech/api/v2/resources/${this.props.userModel.avatar}` : '',
      });

      return true;
    }

    return false;
  }

  protected getAttributes(): Record<string, string> {
    return {
      class: 'profile-container',
    };
  }

  protected getChildren(): Record<string, Block> {
    const backPanel = new BackPanel({
      onClick: () => {
        router.back();
      },
    });

    const logoutButton = new Button({
      appearance: EButtonAppearance.TEXT,
      text: 'Выйти',
      className: 'profile-block__close-button',
      onClick: () => {
        authController.logout();
      },
    });

    const editButton = new Button({
      appearance: EButtonAppearance.TEXT,
      text: 'Изменить данные',
      className: 'profile-block__edit-button',
      onClick: () => {
        router.go('/profile-editing');
      },
    });

    const editPasswordButton = new Button({
      appearance: EButtonAppearance.TEXT,
      text: 'Изменить пароль',
      className: 'profile-block__edit-button',
      onClick: () => {
        router.go('/password-editing');
      },
    });

    const avatarBlock = new Avatar({
      url: this.props.userModel ? `https://ya-praktikum.tech/api/v2/resources/${this.props.userModel.avatar}` : '',
      onClick: this.toggleModalVisibility.bind(this),
      className: 'profile-block__avatar-container',
    });

    const avatarModal = new AvatarModal({
      onClose: this.toggleModalVisibility.bind(this),
      onSave: this.onAvatarSave.bind(this),
    });

    return {
      backPanel,
      avatarBlock,
      avatarModal,
      editButton,
      editPasswordButton,
      logoutButton,
    };
  }

  public onAvatarSave() {
    this.toggleModalVisibility();
    authController.getUser();
  }

  public toggleModalVisibility() {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  public render(): DocumentFragment {
    const { userModel } = this.props;

    return this.compile(profileTemplate, {
      email: userModel?.email || '',
      login: userModel?.login || '',
      first_name: userModel?.first_name || '',
      second_name: userModel?.second_name || '',
      display_name: userModel?.display_name || '',
      phone: userModel?.phone || '',
      isModalVisible: this.state.isModalVisible,
    });
  }
}

function mapStateToProps(state: IRootState) {
  return {
    userModel: state.user,
  };
}

export default connect(mapStateToProps)(Profile);
