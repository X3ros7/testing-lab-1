import { Module } from '@nestjs/common';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Ride, RideSchema } from './schemas/ride.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Ride.name, schema: RideSchema }]),
  ],
  controllers: [RideController],
  providers: [RideService],
})
export class RideModule {}
