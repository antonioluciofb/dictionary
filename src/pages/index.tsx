import { PasswordField } from '@components/PasswordField'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import authService from '@services/Auth'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { Logo } from '@components/Logo'
import { AuthContext } from '@contexts/AuthContext'
import { SignInData, SignUpData } from '@interfaces/AuthContext'
import { cookieAuthKey } from '@constants/auth'
import { verifyJWTToken } from '@utils/verifyToken'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export const App = () => {
  const { signIn, signUp } = useContext(AuthContext)
  const [isSignUp, setIsSignUp] = useState(false)

  const schema: any = yup.object().shape({
    name: !isSignUp
      ? yup.string()
      : yup.string().required('Nome é obrigatório'),
    email: yup
      .string()
      .email('Email é inválido')
      .required('Email é obrigatório'),
    password: yup
      .string()
      .min(3, 'A senha deve ter no mínimo 3 caracteres')
      .required('Senha é obrigatória'),
  })

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (!isSignUp) {
      clearErrors('name')
    }
  }, [isSignUp])

  useEffect(() => {
    authService.touchAPI()
  }, [])

  async function onSubmit({ name, email, password }: SignUpData) {
    if (isSignUp) {
      await signUp({ name, email, password })
    } else {
      await signIn({ email, password })
    }
  }

  const hasSomeError = Object.keys(errors).length > 0

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
            <HStack spacing="1" justify="center">
              <Text color="muted">
                {isSignUp ? 'Já tem conta?' : 'Não tem uma conta?'}
              </Text>
              <Button
                variant="link"
                colorScheme="blue"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? 'Entrar' : 'Cadastre-se'}
              </Button>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{ base: '8', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg="white"
          w={useBreakpointValue({
            base: '90%',
          })}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius="xl"
        >
          <Stack spacing="6">
            <Stack spacing="5">
              {isSignUp && (
                <FormControl isInvalid={errors?.name?.message !== undefined}>
                  <FormLabel htmlFor="name">Nome</FormLabel>
                  <Input
                    id="name"
                    type="name"
                    {...register('name')}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        handleSubmit(onSubmit)()
                      }
                    }}
                  />
                  <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
                </FormControl>
              )}

              <FormControl isInvalid={errors?.email?.message !== undefined}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(onSubmit)()
                    }
                  }}
                />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>

              <PasswordField
                error={errors?.password?.message}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(onSubmit)()
                  }
                }}
                {...register('password')}
              />
            </Stack>
            <Stack spacing="6">
              <Button
                colorScheme="telegram"
                onClick={handleSubmit(onSubmit)}
                isDisabled={hasSomeError}
                isLoading={isSubmitting}
              >
                {isSignUp ? 'Cadastrar' : 'Entrar'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}

export default App

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { [cookieAuthKey]: token } = parseCookies(ctx)

  try {
    await verifyJWTToken(token)

    return {
      redirect: {
        destination: '/dictionary',
        permanent: false,
      },
    }
  } catch (error) {
    return {
      props: {},
    }
  }
}
