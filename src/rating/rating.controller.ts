import { Body, Controller, Param, Post, Req, UnauthorizedException } from '@nestjs/common';
import { RatingService } from './rating.service';
import { AddRatingDto } from './dto/add-rating.dto';
import { IdDto } from './dto/id.dto';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}
  @Post(':id')
  async addRating(
    @Body() addRatingDto: AddRatingDto,
    @Param() param: IdDto,
    @Req() req: Request, 
  ) {
    const userId = req.user?.id;
    
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.ratingService.addRating(addRatingDto, param, userId);
  }
}
