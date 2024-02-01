import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional } from 'class-validator';

export type SortOptions = 'priority' | '-priority' | 'url' | '-url';

export class GetUrlsQueryDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  priority?: number;

  @IsOptional()
  @IsIn(['priority', '-priority', 'url', '-url'])
  sort?: SortOptions;
}
