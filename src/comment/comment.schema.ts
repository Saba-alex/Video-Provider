import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type CommentDocument = mongoose.HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop()
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  videoId: mongoose.Schema.Types.ObjectId;

  @Prop()
  content: string;

@Prop({ type: String, default: null })
  parentCommentId: string;
}
export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.index({ videoId: 1 });