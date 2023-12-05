import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type TokenDocument = Token & mongoose.Document;

@Schema({ _id: false })
export class Token {
  @Prop({ defaultOptions: false })
  _id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  accessToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
