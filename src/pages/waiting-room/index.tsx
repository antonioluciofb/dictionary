import { useContext, useEffect } from 'react'
import { Spinner } from '@chakra-ui/spinner'
import {
  Box,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Logo } from '@components/Logo'
import { AuthContext } from '@contexts/AuthContext'
import { useRouter } from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import { GetServerSideProps } from 'next'
import { cookieAuthKey } from '@constants/auth'
import { verifyJWTToken } from '@utils/verifyToken'

export const App = () => {
  const { user } = useContext(AuthContext)

  const router = useRouter()

  useEffect(() => {
    if (user?.token) {
      router.push('/dictionary')
    } else {
      router.push('/')
    }
  }, [user])

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8" align="center">
        <Stack spacing="6">
          <Logo />
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading
              size={useBreakpointValue({ base: 'xs', md: 'md' })}
              color="blue.500"
            >
              Verbum Libri
            </Heading>
          </Stack>
        </Stack>
        <Box
          w="100%"
          h="30vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Text
            fontSize="xl"
            color="telegram.700"
            fontWeight={500}
            align="center"
          >
            Seja bem-vindo!
          </Text>
          <Text
            fontSize="md"
            color="telegram.700"
            fontWeight={500}
            align="center"
            mb={5}
          >
            Estamos carregando o dicionário para você...
          </Text>
          <Spinner />
        </Box>
      </Stack>
    </Container>
  )
}

export default App

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { [cookieAuthKey]: token, isLogged } = parseCookies(ctx)

  if (isLogged) {
    return {
      redirect: {
        destination: '/dictionary',
        permanent: false,
      },
    }
  }

  try {
    await verifyJWTToken(token)

    setCookie(ctx, 'isLogged', 'true', {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })

    return {
      props: {},
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}
