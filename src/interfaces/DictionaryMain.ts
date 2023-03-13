import { IUserInfo } from './components/UserDetails'
import { IWord } from './components/WordDetails'
import { IWordListProps } from './components/WordList'

export interface Result {
  word: string
  createdAt: Date
  _id: string
}

export interface HistoryAndFavorites {
  totalDocs: number
  totalPages: number
  results: Result[]
  page: number
  hasPrev: boolean
  hasNext: boolean
}

export interface WordList {
  totalDocs: number
  totalPages: number
  results: string[]
  page: number
  hasPrev: boolean
  hasNext: boolean
}

export interface DictionaryProps {
  userInfo: IUserInfo
  allWordsList: WordList
  wordsHistoryList: HistoryAndFavorites
  favoritesList: HistoryAndFavorites
  firstWord: IWord
  limit: number
}
