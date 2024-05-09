import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose"


export type VideoDocument = mongoose.HydratedDocument<Video>

@Schema({timestamps:true})
export class Video {
    @Prop()
    title:string;

    @Prop()
    description:string;

    @Prop()
    duration:Number;
    
    @Prop()
    url: string
 
    @Prop({enum :['PG13','PG16','underage','allage'], default:' allage'})
    ageRestriction:string;

    @Prop()
    averageRating:Number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
VideoSchema.index({ title: 1, averageRating: -1 });