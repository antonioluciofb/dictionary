import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import DesktopNavBar from './DesktopNavBar'
import MobileNavBar from './MobileNavBar'
import { Logo } from '@components/Logo'
import UserDetails from '@components/UserDetails'
import { INavBar } from '@interfaces/components/NavBar'
import LogoutButton from '@components/LogoutButton'

const NavBar: React.FC<INavBar> = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box w="100%" minH="100vh">
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({
              base: 'center',
              md: 'left',
            })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            {useBreakpointValue({
              md: <Logo height={6} />,
            })}
          </Text>
          <Flex display={{ base: 'none', md: 'flex' }} ml={6}>
            <DesktopNavBar />
          </Flex>
          {useBreakpointValue({
            base: <UserDetails />,
            md: null,
          })}
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          alignItems="center"
          spacing={6}
        >
          {useBreakpointValue({
            md: <UserDetails />,
          })}
          <LogoutButton />
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNavBar />
      </Collapse>
      {children}
    </Box>
  )
}

export default NavBar
