import { Stack, Flex, useColorModeValue, Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import navItems from '../navItems'

const MobileNavBar: React.FC = () => {
  const router = useRouter()
  const navigate = (url: string) => {
    router.push(url)
  }
  const selectedUrl = router.pathname

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {navItems.map((navItem) => (
        <Stack spacing={4} key={navItem?.href}>
          <Flex
            py={2}
            justify={'space-between'}
            onClick={() => navigate(navItem?.href || '#')}
            align={'center'}
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Text
              fontWeight={600}
              color={selectedUrl === navItem?.href ? 'blue.400' : 'gray.600'}
            >
              {navItem.label}
            </Text>
          </Flex>
        </Stack>
      ))}
    </Stack>
  )
}

export default MobileNavBar
