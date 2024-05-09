import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class GetVideosDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  sortByRating?: boolean;
}