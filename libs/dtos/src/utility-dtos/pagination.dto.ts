import { isNumberString, Max, Min } from 'class-validator';
import { Transform, Expose } from 'class-transformer';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IPagination, IPaginationResponse } from '@libs/interfaces';
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_MAX_LIMIT, PAGINATION_DEFAULT_SKIP } from '../constants';
import { ConstructableDTO } from './constructable.dto';

export class PaginationParamsDTO implements IPagination {
  @Expose()
  @ApiPropertyOptional({ default: PAGINATION_DEFAULT_SKIP })
  @Min(0)
  @Transform(({ value }) => ((isNumberString(value) ? parseInt(value) : value) || PAGINATION_DEFAULT_SKIP))
  skip: number = PAGINATION_DEFAULT_SKIP;

  @Expose()
  @ApiPropertyOptional({ default: PAGINATION_DEFAULT_SKIP })
  @Min(1)
  @Max(PAGINATION_MAX_LIMIT)
  @Transform(({ value }) => ((isNumberString(value) ? parseInt(value) : value) || PAGINATION_DEFAULT_LIMIT))
  limit: number = PAGINATION_DEFAULT_LIMIT;
}

export class PaginationResponseDTO<T> extends ConstructableDTO<PaginationResponseDTO<T>> implements IPaginationResponse<T> {
  @Expose()
  @ApiProperty()
  skip: number;

  @Expose()
  @ApiProperty()
  limit: number;

  @Expose()
  @ApiProperty()
  count: number;

  // If you want to use with nest swagger, need to redefine this field with ApiProperty decorator in child class
  @Expose()
  items: T[];
}
