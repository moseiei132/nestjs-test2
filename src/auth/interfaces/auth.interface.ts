import { IUser } from 'src/users/interfaces/user.interface'

export interface IAccessToken {
  accessToken: string
}

export interface RequestUser extends Request {
  user: IUser
}

export interface ILogin{
  username: string

  password: string
}

export interface IRegister{
  username: string

  password: string

  email: string
}