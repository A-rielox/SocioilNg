export interface Pagination {
   currentPage: number;
   itemsPerPage: number;
   totalItems: number;
   totalPages: number;
}

// T xej Member[]
export class PaginatedResult<T> {
   result?: T;
   pagination?: Pagination;
}
