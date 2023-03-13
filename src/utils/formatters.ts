import { HistoryAndFavorites, WordList } from '@interfaces/DictionaryMain'

export const formatFavoritesList = (
  favoritList: HistoryAndFavorites
): WordList => ({
  ...favoritList,
  results: favoritList.results.map((result) => result.word),
})

export const formatHistoryList = (
  historyList: HistoryAndFavorites
): WordList => ({
  ...historyList,
  results: historyList.results.map((result) => result.word),
})
