export interface PaginationState {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface PaginationParams {
  page: number
  pageSize: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
}
