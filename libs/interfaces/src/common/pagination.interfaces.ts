export interface IPagination {
  skip?: number;
  limit?: number;
  sort?: Record<string, 'ASC' | 'DESC'>;
}

export interface IPaginatedResponse<T> {
  skip: number;
  limit: number;
  count: number;
  items: T[];
}
