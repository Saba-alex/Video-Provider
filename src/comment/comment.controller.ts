import { Controller, Post, Put, Param, Body, Get } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { ReplyCommentDto } from './dto/reply-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create/:videoId')
  async createComment(
    @Param('videoId') videoId: string,
    @Body() createCommentDto: AddCommentDto,
  ) {
    return this.commentsService.createComment(createCommentDto, videoId);
  }

  @Put('update/:commentId')
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(commentId, updateCommentDto);
  }

  @Post('reply/:parentCommentId')
  async replyComment(
    @Param('parentCommentId') parentCommentId: string,
    @Body() replyCommentDto: ReplyCommentDto,
  ) {
    return this.commentsService.replyComment(parentCommentId, replyCommentDto);
  }

  @Get('view/:videoId')
  async viewAllComments(@Param('videoId') videoId: string) {
    return this.commentsService.viewAllComments(videoId);
  }
}

