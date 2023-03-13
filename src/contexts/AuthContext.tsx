import { createContext, useEffect, useState } from 'react'
import authService from '@services/Auth'
import {
  AuthContextType,
  SignInData,
  SignUpData,
  User,
} from '@interfaces/AuthContext'
import { setCookie, parseCookies } from 'nookies'
import { toast } from 'react-toastify'
import { cookieAuthKey } from 'src/constants/auth'
import Router from 'next/router'
import { clientProvider } from '@services/Client'
import { IUserInfo } from '@interfaces/components/UserDetails'

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUserInfo>()
  const isAuthenticated = false

  useEffect(() => {
    const { [cookieAuthKey]: token } = parseCookies()

    clientProvider.defaults.headers['Authorization'] = `Bearer ${token}`
  }, [])

  const signIn = async ({ email, password }: SignInData) => {
    try {
      const { id, name, token } = await authService.signIn({
        email,
        password,
      })

      setCookie(undefined, cookieAuthKey, token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })

      clientProvider.defaults.headers['Authorization'] = `Bearer ${token}`

      setUser({ id, name, token })

      Router.push('/waiting-room')

      toast.success('Login realizado com sucesso')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const signUp = async ({ name, email, password }: SignUpData) => {
    try {
      const {
        id,
        name: userName,
        token,
      } = await authService.signUp({
        name,
        email,
        password,
      })

      setCookie(undefined, cookieAuthKey, token, {
        maxAge: 60 * 60 * 1, // 1 hour
      })

      clientProvider.defaults.headers['Authorization'] = `Bearer ${token}`

      setUser({ id, name: userName, token })

      Router.push('/dictionary')

      toast.success('Cadastro realizado com sucesso')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        signIn,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
