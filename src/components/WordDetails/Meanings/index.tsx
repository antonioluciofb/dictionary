import { Box, Text } from '@chakra-ui/react'
import { IMeaningsProps } from '@interfaces/components/WordDetails'
import React from 'react'

const Meanings: React.FC<IMeaningsProps> = ({ meanings }) => {
  const translatePartOfSpeechRef: {
    [key: string]: string
  } = {
    noun: 'Sustantivo',
    verb: 'Verbo',
    interjection: 'Interjeição',
    adjective: 'Adjetivo',
    adverb: 'Advérbio',
    preposition: 'Preposição',
    conjunction: 'Conjunção',
    determiner: 'Determinante',
    abbreviation: 'Abreviação',
    exclamation: 'Exclamação',
    'phrasal verb': 'Verbo Frasal',
    idiom: 'Idioma',
    article: 'Artigo',
    pronoun: 'Pronome',
  }

  return (
    <Box w="100%" p={[5, 3]} overflow="auto">
      {meanings?.map((meaning) => (
        <Box key={meaning.partOfSpeech} mb={4}>
          <Text fontSize="xl" fontWeight="bold">
            {translatePartOfSpeechRef[meaning.partOfSpeech]}
          </Text>
          {meaning.definitions.map((definition) => (
            <Box
              key={definition.definition}
              border="2px solid #2b6bb09c"
              borderRadius={10}
              p={[5, 2.5]}
              mt={2}
            >
              <Text fontSize="sm">{definition.definition}</Text>
              <Text fontWeight="bold">{definition.example}</Text>
              {definition.antonyms.length > 0 && (
                <Box mt={2}>
                  <Text fontWeight="bold">Antônimos</Text>
                  <Text>{meaning.antonyms.join(', ')}</Text>
                </Box>
              )}
              {definition.synonyms.length > 0 && (
                <Box mt={2}>
                  <Text fontWeight="bold">Sinônimos</Text>
                  <Text>{definition.synonyms.join(', ')}</Text>
                </Box>
              )}
            </Box>
          ))}
          {meaning.antonyms.length > 0 && (
            <Box
              mt={2}
              fontSize="md"
              border="2px solid #2b6bb09c"
              borderRadius={10}
              p={[5, 2.5]}
            >
              <Text fontWeight="bold">Antônimos</Text>
              <Text>{meaning.antonyms.join(', ')}</Text>
            </Box>
          )}
          {meaning.synonyms.length > 0 && (
            <Box
              mt={2}
              fontSize="md"
              border="2px solid #2b6bb09c"
              borderRadius={10}
              p={[5, 2.5]}
            >
              <Text fontWeight="bold">Sinônimos</Text>
              <Text>{meaning.synonyms.join(', ')}</Text>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default Meanings
