import { cookieAuthKey } from '@constants/auth'
import { GetServerSidePropsContext } from 'next'
import { destroyCookie } from 'nookies'

export const logout = (ctx?: GetServerSidePropsContext): any => {
  destroyCookie(ctx, cookieAuthKey)
  destroyCookie(ctx, 'isLogged')

  if (!ctx && window) {
    window.location.href = '/'
  } else {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
