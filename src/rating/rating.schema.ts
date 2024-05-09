import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type RatingDocument = mongoose.HydratedDocument<Rating>;

@Schema({ timestamps: true })
export class Rating {
  userId: mongoose.Schema.Types.ObjectId;

  @Prop()
  videoId: mongoose.Schema.Types.ObjectId;

  @Prop()
  rating: Number;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
RatingSchema.index({ videoId: 1 });