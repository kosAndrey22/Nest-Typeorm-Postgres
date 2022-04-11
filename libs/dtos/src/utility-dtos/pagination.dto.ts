import { IsInt, isNumberString, Max, Min } from 'class-validator';
import { Transform, Expose } from 'class-transformer';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_MAX_LIMIT } from '../constants';
import { ConstructableDTO } from './constructable.dto';

export class PaginationParamsDTO {
  @ApiPropertyOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => (isNumberString(value) ? parseInt(value) : value))
  skip?: number = 0;

  @ApiPropertyOptional()
  @IsInt()
  @Min(1)
  @Max(PAGINATION_MAX_LIMIT)
  @Transform(({ value }) => (isNumberString(value) ? parseInt(value) : value))
  limit: number = PAGINATION_DEFAULT_LIMIT;
}

export class PaginationResponseDTO<T> extends ConstructableDTO<PaginationResponseDTO<T>> {
  @Expose()
  @ApiProperty()
  skip: number;

  @Expose()
  @ApiProperty()
  limit: number;

  @Expose()
  @ApiProperty()
  count: number;
}
