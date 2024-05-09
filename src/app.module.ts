import { Module } from '@nestjs/common';

import { CommentModule } from './comment/comment.module';
import { VideoModule } from './video/video.module';
import { RatingModule } from './rating/rating.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [CommentModule, VideoModule, RatingModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
