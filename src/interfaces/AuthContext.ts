import { IUserInfo } from './components/UserDetails'

export type User = {
  id: string
  name: string
  token: string
}

export type SignInData = {
  email: string
  password: string
}

export interface SignUpData extends SignInData {
  name: string
}

export type AuthContextType = {
  isAuthenticated: boolean
  user: IUserInfo | undefined
  setUser: (user: User) => void
  signIn: ({ email, password }: SignInData) => Promise<void>
  signUp: ({ name, email, password }: SignUpData) => Promise<void>
}
