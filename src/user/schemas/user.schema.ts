import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: false })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
