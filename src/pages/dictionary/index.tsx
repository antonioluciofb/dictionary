import NavBar from '@components/NavBar'
import React, { useContext, useState } from 'react'
import WordDetails from '@components/WordDetails'
import { AuthContext } from '@contexts/AuthContext'
import { Box } from '@chakra-ui/react'
import { cookieAuthKey } from 'src/constants/auth'
import { GetServerSideProps } from 'next'
import {
  getUserFavoritesWords,
  getUserInformations,
  getUserWordsHistory,
} from '@services/User'
import { logout } from '@utils/logout'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'
import { verifyJWTToken } from '@utils/verifyToken'
import WordsList from '@components/WordsList'
import {
  favoriteWord,
  getWordDetails,
  getWords,
  unFavoriteWord,
} from '@services/Entries'
import { DictionaryProps, WordList } from '@interfaces/DictionaryMain'
import { toast } from 'react-toastify'
import { formatFavoritesList, formatHistoryList } from '@utils/formatters'
import { IWord } from '@interfaces/components/WordDetails'
import { IUserInfo } from '@interfaces/components/UserDetails'

const Dictionary: React.FC<DictionaryProps> = ({
  userInfo,
  allWordsList,
  favoritesList,
  wordsHistoryList,
  firstWord,
  limit,
}) => {
  const { user, setUser } = useContext(AuthContext)

  const [selectedHeader, setSelectedHeader] = useState('all')
  const [currentPage, setCurrentPage] = useState<{
    [key: string]: number
  }>({
    all: 1,
    recent: 1,
    favorite: 1,
  })
  const [loading, setLoading] = useState(false)
  const [loadingWordDetails, setLoadingWordDetails] = useState(false)

  const [selectedWord, setSelectedWord] = useState(firstWord.word)
  const [wordDetails, setWordDetails] = useState<IWord>(firstWord)

  const [listFavorites, setListFavorites] = useState<WordList>(
    formatFavoritesList(favoritesList)
  )
  const [listHistory, setListHistory] = useState<WordList>(
    formatHistoryList(wordsHistoryList)
  )
  const [listAllWords, setListAllWords] = useState(allWordsList)

  const optionsList = [
    { label: 'Todas as palavras', type: 'all' },
    { label: 'Recentes', type: 'recent' },
    { label: 'Favoritas', type: 'favorite' },
  ]

  const listWords: {
    [key: string]: WordList
  } = {
    all: listAllWords,
    recent: listHistory,
    favorite: listFavorites,
  }

  const handleFavoriteWord = async (word: string) => {
    try {
      if (selectedHeader === 'all') {
        setListFavorites((prev) => ({
          ...prev,
          results: [...prev.results, word],
        }))
        setUser({
          ...user,
          favoritesWords: (user?.favoritesWords || 0) + 1,
        } as IUserInfo)
      }
      await favoriteWord(word)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleUnFavoriteWord = async (word: string) => {
    try {
      setListFavorites((prev) => ({
        ...prev,
        results: prev.results.filter((item) => item !== word),
      }))

      await unFavoriteWord(word)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const handleSelectWord = async (word: string) => {
    setLoadingWordDetails(true)
    try {
      setSelectedWord(word)
      const wordDetails = await getWordDetails(word)
      if (selectedHeader === 'all') {
        setListHistory((prev) => ({
          ...prev,
          results: [...prev.results, word],
        }))
        setUser({
          ...user,
          wordsHistory: (user?.wordsHistory || 0) + 1,
        } as IUserInfo)
      }
      setWordDetails(wordDetails)
    } catch (error: any) {
      toast.error(error.message)
    }
    setLoadingWordDetails(false)
  }

  const handleSearcByHeader = async (
    selectedPage: number,
    searchName?: string
  ) => {
    setLoading(true)

    if (selectedHeader === 'all') {
      setCurrentPage((prev) => ({ ...prev, all: selectedPage }))
      const newListAllWords = await getWords({
        page: selectedPage,
        limit,
        search: searchName,
      })

      setListAllWords(newListAllWords)
    }

    if (selectedHeader === 'recent') {
      setCurrentPage((prev) => ({ ...prev, recent: selectedPage }))
      const newListHistory = await getUserWordsHistory({
        page: selectedPage,
        limit,
        search: searchName,
      })

      setListHistory(formatHistoryList(newListHistory))
    }

    if (selectedHeader === 'favorite') {
      setCurrentPage((prev) => ({ ...prev, favorite: selectedPage }))
      const newListFavorites = await getUserFavoritesWords({
        page: selectedPage,
        limit,
        search: searchName,
      })

      setListFavorites(formatFavoritesList(newListFavorites))
    }

    setLoading(false)
  }

  useEffect(() => {
    if (!user?.wordsHistory) {
      setUser(userInfo)
    }
  }, [userInfo])

  let timeout: NodeJS.Timeout

  return (
    <NavBar>
      <Box
        w="100vw"
        h="90vh"
        p={[5, 5]}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          w="100%"
          h="100%"
          maxH={500}
          maxW={1200}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderRadius={10}
          overflow="hidden"
        >
          <WordDetails
            wordDetails={wordDetails}
            isLoadingWord={loadingWordDetails}
          />
          <WordsList
            loading={loading}
            optionsList={optionsList}
            wordsList={listWords[selectedHeader]}
            selectedHeader={selectedHeader}
            setSelectedHeader={setSelectedHeader}
            selectedWord={selectedWord}
            setSelectedWord={handleSelectWord}
            paginationDetails={{
              currentPage: currentPage[selectedHeader],
              limit,
              totalItems: listWords[selectedHeader].totalDocs,
            }}
            setCurrentPage={(page) => handleSearcByHeader(page)}
            onFavorite={handleFavoriteWord}
            onUnFavorite={handleUnFavoriteWord}
            favoriteList={listFavorites.results}
            onSearch={async (word) => {
              clearTimeout(timeout)

              timeout = setTimeout(async () => {
                setLoading(true)
                handleSearcByHeader(1, word.toLowerCase())
              }, 1000)
            }}
          />
        </Box>
      </Box>
    </NavBar>
  )
}

export default Dictionary

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { [cookieAuthKey]: token } = parseCookies(ctx)

  try {
    await verifyJWTToken(token)

    const limit = 50 // Max is 100

    const userInfo = await getUserInformations(ctx)
    const allWordsList = await getWords(
      {
        limit,
      },
      ctx
    )
    const firstWord = await getWordDetails(allWordsList.results[0], ctx)
    const wordsHistoryList = await getUserWordsHistory(
      {
        limit,
      },
      ctx
    )
    const favoritesList = await getUserFavoritesWords(
      {
        limit,
      },
      ctx
    )

    return {
      props: {
        userInfo: userInfo || {},
        allWordsList: allWordsList || [],
        wordsHistoryList: wordsHistoryList || [],
        favoritesList: favoritesList || [],
        firstWord: firstWord || {},
        limit: limit || 50,
      },
    }
  } catch (error) {
    return logout(ctx)
  }
}
