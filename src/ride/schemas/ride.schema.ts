import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema()
export class Ride {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  destination: string;

  @Prop()
  distance: number;

  @Prop()
  cost: number;
}

export const RideSchema = SchemaFactory.createForClass(Ride)
