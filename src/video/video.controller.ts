import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { IdDto } from 'src/rating/dto/id.dto';
import { GetVideosDto } from './dto/get-video.dto';

@Controller('video')
export class VideoController {
  videosService: any;
  constructor(private readonly videoService: VideoService) {}

  @Post('/create')
  async createVideo(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.createVideo(createVideoDto);
  }

  @Get('/getAll')
  async getVideos(@Query() query: GetVideosDto) {
    return this.videosService.getVideos(query);
  }
  @Get('play/:id')
  async playVideo(@Param() params: IdDto) {
    const videoUrl = await this.videosService.playVideo(params);
    if (!videoUrl) {
      throw new NotFoundException('Video not found');
    }
    return videoUrl;
  }
}
