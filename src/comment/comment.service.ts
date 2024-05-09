import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { REQUEST } from '@nestjs/core';
import { Model } from 'mongoose';
import { Request } from 'express';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { ReplyCommentDto } from './dto/reply-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @Inject(REQUEST) private request: Request,
  ) {}

  async createComment(createCommentDto: AddCommentDto, videoId: string) {
    const { content } = createCommentDto;
    const userId = this.request.user._id; 
    const comment = new this.commentModel({ content, userId, videoId });
    return comment.save();
  }

  async updateComment(commentId: string, updateCommentDto: UpdateCommentDto) {
    const { content } = updateCommentDto;
    const userId = this.request.user._id; 
    const comment = await this.commentModel.findOneAndUpdate(
      { _id: commentId, userId },
      { content },
      { new: true },
    );
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async replyComment(parentCommentId: string, replyCommentDto: ReplyCommentDto) {
    const { content } = replyCommentDto;
    const userId = this.request.user._id; 
    const comment = await this.commentModel.findById(parentCommentId);
    if (!comment) {
      throw new NotFoundException('Parent comment not found');
    }
    const reply = new this.commentModel({ content, userId, parentCommentId });
    return reply.save();
  }

  async viewAllComments(videoId: string) {
    return this.commentModel.find({ videoId }).sort({ createdAt: 'desc' });
  }
}
