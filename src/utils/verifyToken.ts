import { clientProvider } from '@services/Client'
import { jwtVerify } from 'jose'

export const verifyJWTToken = async (token: string) => {
  const secretCode = process.env.SECRET
  const encodedSecret = new TextEncoder().encode(secretCode)

  const convertedSecret = new Uint8Array(encodedSecret)

  const { payload } = await jwtVerify(token, convertedSecret)

  clientProvider.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  return payload
}
