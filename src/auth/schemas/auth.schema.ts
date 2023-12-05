import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestDocument = HydratedDocument<User>;

class ActivePresset {
  @Prop({ type: String })
  namePresset: string | null;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Map, of: String })
  params: Map<string, string>;
}

class Balance {
  @Prop({ type: Number, default: 0 })
  count: number;

  @Prop({ type: String, default: 'dollars' })
  currency: string;
}

@Schema()
export class User {
  @Prop(String)
  _id: string;

  @Prop({ type: String, default: 'initialUser' })
  role: string;

  @Prop(String)
  name: string;

  @Prop({ type: Balance })
  balance: Balance;

  @Prop({ type: ActivePresset })
  activePresset: ActivePresset;

  @Prop(String)
  surname: string;

  @Prop({ unique: true, type: String })
  email: string;

  @Prop(String)
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
