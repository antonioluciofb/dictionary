import { GetWordsFilters } from '@interfaces/services/Entries'
import { GetServerSidePropsContext } from 'next'
import { toast } from 'react-toastify'
import { clientProvider } from './Client'

const formatParams = (params: GetWordsFilters) => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    return `${acc}${value ? `&${key}=${value}` : ''}`
  }, '')
}

export const getWords = async (
  { search, page, limit }: GetWordsFilters,
  ctx?: GetServerSidePropsContext
) => {
  const params = formatParams({ search, page, limit })

  try {
    const response = await clientProvider.get(`/entries/en?${params}`)
    return response.data
  } catch (error: any) {
    if (ctx) {
      return error.response.data
    }

    throw new Error(
      error?.response?.data?.message || 'Erro ao buscar as palavras'
    )
  }
}

export const getWordDetails = async (
  word: string,
  ctx?: GetServerSidePropsContext
) => {
  try {
    const response = await clientProvider.get(`/entries/en/${word}`)
    return response.data
  } catch (error: any) {
    if (ctx) {
      return error.response.data
    }

    throw new Error(
      error?.response?.data?.message || 'Erro ao buscar as palavras'
    )
  }
}
export const favoriteWord = async (
  word: string,
  ctx?: GetServerSidePropsContext
) => {
  try {
    const response = await clientProvider.post(`/entries/en/${word}/favorite`)
    toast.success('Palavra favoritada com sucesso')

    return response.data
  } catch (error: any) {
    if (ctx) {
      return error.response.data
    }

    throw new Error(
      error?.response?.data?.message || 'Erro ao buscar as palavras'
    )
  }
}
export const unFavoriteWord = async (
  word: string,
  ctx?: GetServerSidePropsContext
) => {
  try {
    const response = await clientProvider.delete(
      `/entries/en/${word}/unfavorite`
    )
    toast.success('Palavra desfavoritada com sucesso')
    return response.data
  } catch (error: any) {
    if (ctx) {
      return error.response.data
    }

    throw new Error(
      error?.response?.data?.message || 'Erro ao buscar as palavras'
    )
  }
}

export default {}
