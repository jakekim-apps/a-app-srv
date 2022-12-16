export const paginationLabels = {
  totalDocs: 'total',
  docs: 'items',
  limit: 'limit',
  page: 'page',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'totalPages'
}

export class PaginationItems<T> {
  total: number;
  items: [T];
  limit: number;
  page: number;
  next: boolean;
  prev: boolean;
  totalPages: number;
}
