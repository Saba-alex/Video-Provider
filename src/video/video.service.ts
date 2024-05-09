import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './video.schema';
import { IdDto } from 'src/rating/dto/id.dto';
import { GetVideosDto } from './dto/get-video.dto';

@Injectable()
export class VideoService {
  [x: string]: any;
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  async createVideo(body: CreateVideoDto){
    const video = new this.videoModel(body);
    return video.save();
  }

  async getVideos(query: GetVideosDto) {
    const aggregate = [];

    if (query.title) {
      aggregate.push({ $match: { title: { $regex: query.title, $options: 'i' } } });
    }

    if (query.sortByRating) {
      aggregate.push({ $sort: { averageRating: -1 } });
    }

    aggregate.push({ $project: { _id: 0, __v: 0, updatedAt: 0 } });

    return this.videoModel.aggregate(aggregate);
  }

  async playVideo(param: IdDto): Promise<string> {
    if (!this.request.user || !this.request.user.dateOfBirth) {
      throw new NotFoundException('User date of birth not provided');
    }

    const userDateOfBirth = moment(this.request.user.dateOfBirth);
    const age = moment().diff(userDateOfBirth, 'years');

    const video = await this.videoModel.findById(param.id);
    if (!video) {
      throw new NotFoundException('Video not found');
    }
    if (age < video.ageRestriction) {
      throw new ForbiddenException(
        'You are not old enough to watch this video',
      );
    }
    return video.url;
  }


  async findVideoById(id: string) {
    return this.videoModel.findById(id);
  }
}
function moment(dateOfBirth: any) {
  throw new Error('Function not implemented.');
}

