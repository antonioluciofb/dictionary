import {
  Avatar,
  Box,
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
import { AuthContext } from '@contexts/AuthContext'
import { IUserDetails } from '@interfaces/components/UserDetails'
import React, { useContext } from 'react'
import { AiOutlineUser } from 'react-icons/ai'

const UserDetails: React.FC<IUserDetails> = ({}) => {
  const { user } = useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <AiOutlineUser size={20} cursor="pointer" onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent w="90%">
          <ModalHeader>Detalhes de Usuário</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              mb={2}
            >
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                }}
              >
                Nome:&nbsp;
              </Text>
              <Text m={0}>{user?.name}</Text>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              mb={2}
            >
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                }}
              >
                Email:&nbsp;
              </Text>
              <Text m={0}>{user?.email}</Text>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              mb={2}
            >
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                }}
              >
                Palavras Buscadas:&nbsp;
              </Text>
              <Text m={0}>{user?.wordsHistory}</Text>
            </Box>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              mb={2}
            >
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                }}
              >
                Palavras Favoritadas:&nbsp;
              </Text>
              <Text m={0}>{user?.favoritesWords}</Text>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UserDetails
