import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async add(
    password: string,
    username: string,
    email?: string,
    phone?: string,
  ) {
    const newUser = new this.userModel({ password, username, email, phone });
    return newUser.save();
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async findOneByPhone(phone: string) {
    return this.userModel.findOne({ phone });
  }
}
