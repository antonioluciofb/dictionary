import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react'
import Pagination from '@components/Pagination'
import WordItem from '@components/WordItem'
import { IWordListProps } from '@interfaces/components/WordList'
import React from 'react'

const WordsList: React.FC<IWordListProps> = ({
  loading,
  onSearch,
  wordsList,
  selectedHeader,
  setSelectedHeader,
  selectedWord,
  setSelectedWord,
  onFavorite,
  onUnFavorite,
  favoriteList,
  optionsList,
  paginationDetails,
  setCurrentPage,
}) => {
  return (
    <Box
      w="60%"
      h="100%"
      p={[10, 5]}
      maxW={1200}
      bg="white"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
    >
      <InputGroup size="md" mb="4">
        <InputLeftAddon children="Exemplo: Fire" rounded={8} />
        <Input
          placeholder="Digite uma palavra que queria pesquisar"
          rounded={8}
          onChange={(e) => onSearch(e.target.value)}
        />
      </InputGroup>
      <Box w="100%" mb="4" display="flex" flexWrap="wrap">
        {optionsList.map((button) => (
          <WordItem
            isHeader
            type={button.type}
            label={button.label}
            selectedHeader={selectedHeader}
            onSelect={setSelectedHeader}
            mr="4"
          />
        ))}
      </Box>
      <Box
        w="100%"
        h="70%"
        border="2px"
        borderRadius={8}
        borderColor="blackAlpha.300"
        mb="4"
        p="3"
        overflowY="scroll"
      >
        {loading ? (
          <Box
            w="100%"
            h="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            Carregando...
          </Box>
        ) : wordsList.results.length > 0 ? (
          <Box w="100%" display="flex" flexWrap="wrap">
            {wordsList.results.map((word, index) => (
              <WordItem
                word={word}
                label={word}
                selectedWord={selectedWord}
                isFavorite={favoriteList.includes(word)}
                onSelect={setSelectedWord}
                onFavorite={onFavorite}
                onUnFavorite={onUnFavorite}
                m="1"
              />
            ))}
          </Box>
        ) : (
          <Box
            w="100%"
            h="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            Nenhuma palavra encontrada
          </Box>
        )}
      </Box>
      <Box minH="10">
        {paginationDetails.totalItems > paginationDetails.limit && (
          <Pagination
            currentPage={paginationDetails.currentPage}
            totalItems={paginationDetails.totalItems}
            limit={paginationDetails.limit}
            onSelectPage={setCurrentPage}
          />
        )}
      </Box>
    </Box>
  )
}

export default WordsList
