export interface IAuthSignInData {
  email: string
  password: string
}

export interface IAuthSignUpData extends IAuthSignInData {
  name: string
}

export interface IAuthResponseData {
  id: string
  name: string
  token: string
}
