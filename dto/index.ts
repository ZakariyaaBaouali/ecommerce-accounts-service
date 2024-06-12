export interface AccountDTO {
  id: string;
  userName: string;
  email: string;
  password: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAccountDTO {
  id: string;
  userName: string;
  email: string;
  password: string;
}

export interface LoginAccountDTO {
  email: string;
  password: string;
}

export interface AddAccountAvatar {
  id: string;
  avatar: string;
}

export interface AddAccountPassword {
  id: string;
  password: string;
}
