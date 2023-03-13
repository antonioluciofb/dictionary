export interface IPaginationProps {
  totalItems: number
  currentPage: number
  limit: number
  onSelectPage: (page: number) => void
}
