import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RideModule } from './ride/ride.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    AuthModule,
    RideModule,
    MongooseModule.forRoot('mongodb://root:example@localhost:27017/'),
  ],
})
export class AppModule {}
