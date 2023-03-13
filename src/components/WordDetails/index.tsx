import { Box } from '@chakra-ui/react'
import { IWordDetailsProps } from '@interfaces/components/WordDetails'
import { Text } from '@chakra-ui/react'
import React from 'react'
import Meanings from './Meanings'
import Phonetics from './Phonetics'
import { CircleLoader } from 'react-spinners'

const WordDetails: React.FC<IWordDetailsProps> = ({
  wordDetails,
  isLoadingWord,
}) => {
  return (
    <Box
      w="40%"
      h="100%"
      maxW={1200}
      pt={2}
      bg="white"
      display="flex"
      alignItems="center"
      flexDirection="column"
      borderRight="2px solid #e2e8f0"
    >
      {isLoadingWord ? (
        <Box
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircleLoader color="#3b82f6" size={120}/>
        </Box>
      ) : (
        <>
          <Text fontSize="2xl" m={2}>
            {wordDetails?.word}
          </Text>
          <Box w="100%" overflow="auto">
            <Meanings meanings={wordDetails?.meanings} />
            <Phonetics phonetics={wordDetails?.phonetics} />
          </Box>
        </>
      )}
    </Box>
  )
}

export default WordDetails
