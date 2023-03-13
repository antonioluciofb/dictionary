import { Box, Text } from '@chakra-ui/react'
import { IPhoneticsProps } from '@interfaces/components/WordDetails'
import React from 'react'

const Phonetics: React.FC<IPhoneticsProps> = ({ phonetics }) => {
  const filteredPhonetics = phonetics?.filter((phonetic) => phonetic.audio)

  return (
    <Box
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mb={5}
    >
      {filteredPhonetics?.map((phonetic, index) => (
        <Box
          w="95%"
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          flexDirection="column"
          key={phonetic.text}
        >
          <Text fontSize="md" m={2}>
            Exemplo de pronúncia {index + 1}
          </Text>
          <audio
            controls
            style={{
              width: '100%',
              margin: '10px 0',
              outline: 'none',
              border: 'none',
            }}
          >
            <source src={phonetic.audio} />
          </audio>
        </Box>
      ))}
    </Box>
  )
}

export default Phonetics
