import { IsNotEmpty, IsString } from 'class-validator';

export class ReplyCommentDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;
}