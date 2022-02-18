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

export interface IEditableUserModel extends IUserModel {
  avatar: string;
  display_name: string;
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
  last_message: IMessageModel | null,
}

export interface IMessageModel {
  user: IUserModel,
  time: string,
  content: string,
}
