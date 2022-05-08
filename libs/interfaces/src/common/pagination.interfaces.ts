export interface IPagination {
  skip?: number;
  limit?: number;
};

export interface IPaginationResponse<T> {
  skip: number;
  limit: number;
  count: number;
  items: T[];
};
