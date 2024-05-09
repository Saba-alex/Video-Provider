import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rating } from './rating.schema';
import { Model } from 'mongoose';
import { AddRatingDto } from './dto/add-rating.dto';
import { IdDto } from './dto/id.dto';

@Injectable()
export class RatingService {
    constructor(@InjectModel(Rating.name) private ratingModel: Model<Rating>,){}
    async addRating(body: AddRatingDto, param: IdDto, userId: string) {
        const { id } = param;
        const { rating } = body;
    
        
        const existingRating = await this.ratingModel.findOne({
          userId,
          videoId: id,
        });
    
        if (existingRating) {
         
          return this.ratingModel.findOneAndUpdate(
            { userId, videoId: id },
            { rating },
            { new: true },
          );
        } else {
          
          const newRating = new this.ratingModel({
            rating,
            videoId: id,
            userId,
          });
          return newRating.save();
        }
      }
    }

