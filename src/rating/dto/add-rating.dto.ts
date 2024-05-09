import { IsNumber, Max, Min } from 'class-validator';

export class AddRatingDto {
  @IsNumber()
  @Min(1, { message: 'Rating must be between 1 and 5' })
  @Max(5, { message: 'Rating must be between 1 and 5' })
  rating: number;
}