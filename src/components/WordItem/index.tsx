import { Box, BoxProps } from '@chakra-ui/react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import React from 'react'

interface WordItemProps
  extends Omit<
    BoxProps,
    | 'type'
    | 'word'
    | 'label'
    | 'isHeader'
    | 'selectedHeader'
    | 'selectedWord'
    | 'onSelect'
    | 'onFavorite'
  > {
  type?: string
  word?: string
  label: string
  isHeader?: boolean
  isFavorite?: boolean
  selectedHeader?: string
  selectedWord?: string
  onSelect: (word: string) => void
  onFavorite?: (word: string) => void
  onUnFavorite?: (word: string) => void
}

const WordItem: React.FC<WordItemProps> = ({
  type,
  word,
  label,
  isHeader,
  isFavorite,
  selectedHeader,
  selectedWord,
  onSelect,
  onFavorite,
  onUnFavorite,
  ...rest
}) => {
  const isSelected =
    (isHeader ? selectedHeader : selectedWord) === (isHeader ? type : word)

  return (
    <Box
      key={Math.random().toString(36).substr(2, 9)}
      display="flex"
      width="fit-content"
      height="fit-content"
      alignItems="center"
      justifyContent="center"
      px="4"
      py="2"
      fontSize="md"
      fontWeight="medium"
      bg={isSelected ? 'blue.500' : 'white'}
      color={isSelected ? 'white' : 'black'}
      border="1px"
      borderColor="blue.500"
      borderRadius={8}
      cursor="pointer"
      onClick={() => {
        onSelect((isHeader ? type : word) || '')
      }}
      {...rest}
    >
      {label}
      {isSelected && !isHeader && (
        <Box
          onClick={(e) => {
            e.stopPropagation()
            onFavorite && onFavorite(word || '')
          }}
        >
          {!isFavorite && (
            <AiOutlineHeart
              size={20}
              style={{
                marginLeft: 10,
              }}
            />
          )}
        </Box>
      )}
      {isFavorite && (
        <AiFillHeart
          size={20}
          onClick={(e) => {
            e.stopPropagation()
            onUnFavorite && onUnFavorite(word || '')
          }}
          color="red"
          style={{
            marginLeft: 10,
          }}
        />
      )}
    </Box>
  )
}

export default WordItem
