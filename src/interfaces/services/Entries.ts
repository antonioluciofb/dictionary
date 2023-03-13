import { GetServerSidePropsContext } from 'next'

export interface GetWordsFilters {
  search?: string
  page?: number
  limit?: number
}
