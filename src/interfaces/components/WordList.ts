import { WordList } from '@interfaces/DictionaryMain'
import { IPaginationProps } from './Pagination'

export interface IPaginationDetails
  extends Omit<IPaginationProps, 'onSelectPage'> {}

export interface IWordListProps {
  loading: boolean
  selectedHeader: string
  setSelectedHeader: (header: any) => void
  selectedWord: string
  setSelectedWord: (word: string) => void
  onFavorite: (word: string) => void
  onUnFavorite: (word: string) => void
  favoriteList: string[]
  wordsList: WordList
  optionsList: {
    label: string
    type: string
  }[]
  paginationDetails: IPaginationDetails
  setCurrentPage: (page: number) => void
  onSearch: (search: string) => void
}
