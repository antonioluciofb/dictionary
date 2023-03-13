import { Box } from '@chakra-ui/react'
import { IPaginationProps } from '@interfaces/components/Pagination'
import React from 'react'
import { Pagination as RSuitePagination } from 'rsuite'

const Pagination: React.FC<IPaginationProps> = ({
  currentPage,
  limit,
  totalItems,
  onSelectPage,
}) => {
  return (
    <Box w="100%" display="flex" justifyContent="center">
      <RSuitePagination
        prev
        next
        ellipsis
        size="md"
        total={totalItems}
        boundaryLinks
        maxButtons={8}
        limit={limit}
        activePage={currentPage}
        onChangePage={onSelectPage}
      />
    </Box>
  )
}

export default Pagination
