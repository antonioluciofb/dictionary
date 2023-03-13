import {
  IAuthResponseData,
  IAuthSignInData,
  IAuthSignUpData,
} from '@interfaces/AuthService'
import { clientProvider } from './Client'

const touchAPI = async () => {
  try {
    const response = await clientProvider.get('/')
    return response.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao tocar API.')
  }
}

const signIn = async ({
  email,
  password,
}: IAuthSignInData): Promise<IAuthResponseData> => {
  try {
    const response = await clientProvider.post('/auth/signin', {
      email,
      password,
    })

    return response.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao logar.')
  }
}

const signUp = async ({
  name,
  email,
  password,
}: IAuthSignUpData): Promise<IAuthResponseData> => {
  try {
    const response = await clientProvider.post('/auth/signup', {
      name,
      email,
      password,
    })

    return response.data
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Erro ao cadastrar.')
  }
}

export default {
  signIn,
  signUp,
  touchAPI,
}
