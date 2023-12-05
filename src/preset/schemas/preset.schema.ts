import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestDocument = HydratedDocument<Preset>;

class Price {
  @Prop(Number)
  count: number;

  @Prop(String)
  currency: string;
}

@Schema({ collection: 'todoPresset' })
export class Preset {
  @Prop(String)
  _id: string;

  @Prop(String)
  name: string;

  @Prop(String)
  desc: string;

  @Prop(String)
  image: string;

  @Prop(Number)
  rating: number;

  @Prop(Price)
  price: Price;
}

export const PresetSchema = SchemaFactory.createForClass(Preset);
