import { Expose, Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '@libs/constants';
import { IPagination, IPaginatedResponse } from '@libs/interfaces';
import { ConstructableDTO } from './constructable.dto';

export class PaginationRequestDTO implements IPagination {
  @Expose()
  @IsOptional()
  @Transform(({ value }) => (value ? Number(value) : DEFAULT_SKIP))
  @ApiProperty({ required: false, default: DEFAULT_SKIP })
  skip?: number = DEFAULT_SKIP;

  @Expose()
  @IsOptional()
  @ApiProperty({ required: false, default: DEFAULT_LIMIT })
  @Transform(({ value }) => (value ? Number(value) : DEFAULT_LIMIT))
  limit?: number = DEFAULT_LIMIT;
}

export class PaginationResponsetDTO<T>
  extends ConstructableDTO<PaginationResponsetDTO<T>>
  implements IPaginatedResponse<T>
{
  @Expose()
  @ApiProperty()
  skip: number;

  @Expose()
  @ApiProperty()
  limit: number;

  @Expose()
  @ApiProperty()
  count: number;

  @Expose()
  @ApiProperty()
  items: T[];
}
