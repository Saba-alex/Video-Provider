import { IsString, IsNumber, IsEnum } from 'class-validator';

enum AgeRestriction {
  PG13 = 'PG13',
  PG16 = 'PG16',
  Underage = 'underage',
  AllAge = 'allage',
}

export class CreateVideoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  duration: number;

  @IsString()
  url: string;

  @IsEnum(AgeRestriction)
  ageRestriction: AgeRestriction;

  @IsNumber()
  averageRating: number;
}
