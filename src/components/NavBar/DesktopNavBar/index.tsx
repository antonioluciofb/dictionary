import navItems from '../navItems'
import React from 'react'
import { Box, Link, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const DesktopNavBar: React.FC = () => {
  const router = useRouter()
  const selectedUrl = router.pathname

  const isSameRoute = (url: string | undefined) => {
    return selectedUrl === url
  }

  const navigate = (url: string) => {
    if (isSameRoute(url)) return

    router.push(url)
  }

  return (
    <Stack direction={'row'} spacing={2}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            p={2}
            key={navItem.label}
            fontSize={'sm'}
            fontWeight={500}
            color={isSameRoute(navItem?.href) ? 'blue.400' : 'gray.600'}
            _hover={{
              textDecoration: 'none',
              opacity: isSameRoute(navItem?.href) ? 1 : 0.6,
            }}
            cursor={isSameRoute(navItem?.href) ? 'default' : 'pointer'}
            onClick={() => navigate(navItem?.href || '#')}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  )
}

export default DesktopNavBar
