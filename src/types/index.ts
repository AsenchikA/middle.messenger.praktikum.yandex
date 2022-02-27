export interface IUserModel {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  phone: string
}

export interface ISignUpUserModel extends IUserModel {
  password: string,
}

export interface ISavingUserModel extends IUserModel {
  display_name: string;
}

export interface IFullUserModel extends IUserModel {
  avatar: string;
  display_name: string;
  id: number;
}

export interface ILoginUserModel {
  login: string,
  password: string,
}

export interface IChatModel {
  created_by: number,
  id: number,
  title: string,
  avatar: string | null,
  unread_count: number,
  last_message: IShortMessageModel | null,
}

export interface IShortMessageModel {
  user: IUserModel,
  time: string,
  content: string,
}

export interface IFullMessageModel {
  id: number,
  user_id: number,
  chat_id: number,
  type: 'message' | 'file',
  time: string,
  content: string,
  is_read: boolean,
  file: any,
}

export interface IFormattedFullMessageModel {
  isMine: boolean;
  time: string;
}
