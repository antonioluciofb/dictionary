import React, { useState } from 'react'
import { ILogoutButton } from '@interfaces/components/LogoutButton'
import { logout } from '@utils/logout'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

const LogoutButton: React.FC<ILogoutButton> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Button
        as={'a'}
        fontSize={'sm'}
        fontWeight={400}
        variant={'link'}
        href={'#'}
        onClick={onOpen}
      >
        Sair
      </Button>{' '}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>Sair da plataforma</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={500} mb={2}>
              Tem certeza que deseja sair da plataforma?
            </Text>
            <Text>Você será redirecionado!</Text>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center">
            <Button
              colorScheme="red"
              mr={3}
              isLoading={loading}
              onClick={() => {
                setLoading(true)
                logout()
              }}
              w="100%"
              maxW="300px"
            >
              Sair
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LogoutButton
