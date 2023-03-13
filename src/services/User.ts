import { GetWordsFilters } from '@interfaces/services/Entries'
import { GetServerSidePropsContext } from 'next'
import { clientProvider } from './Client'

const formatParams = (params: GetWordsFilters) => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    return `${acc}${value ? `&${key}=${value}` : ''}`
  }, '')
}

export const getUserInformations = async (ctx?: GetServerSidePropsContext) => {
  try {
    const response = await clientProvider.get('/user/me')

    return response.data
  } catch (error: any) {
    if (ctx) {
      return error.response.data
    }

    throw new Error(
      error?.response?.data?.message || 'Erro ao buscar informações do usuário.'
    )
  }
}

export const getUserWordsHistory = async (
  { search, page, limit }: GetWordsFilters,
  ctx?: GetServerSidePropsContext
) => {
  try {
    const params = formatParams({
      search,
      limit,
      page,
    })
    const response = await clientProvider.get(`/user/me/history?${params}`)

    return response.data
  } catch (error: any) {
    if (ctx) {
      return error.response.data
    }

    throw new Error(
      error?.response?.data?.message || 'Erro ao buscar histórico de palavras.'
    )
  }
}

export const getUserFavoritesWords = async (
  { search, page, limit }: GetWordsFilters,
  ctx?: GetServerSidePropsContext
) => {
  try {
    const params = formatParams({
      search,
      limit,
      page,
    })
    const response = await clientProvider.get(`/user/me/favorites?${params}`)

    return response.data
  } catch (error: any) {
    if (ctx) {
      return error.response.data
    }

    throw new Error(
      error?.response?.data?.message || 'Erro ao buscar palavras favoritas.'
    )
  }
}

export default {}
