import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import mongoose from 'mongoose';

describe('UserService (MongoDB)', () => {
  let service: UserService;
  let userModel: Model<User>;

  beforeAll(async () => {
    await mongoose.connect('mongodb://root:example@localhost:27017/');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: mongoose.model(
            'User',
            new mongoose.Schema({
              username: String,
              password: String,
              email: String,
              phone: String,
            }),
          ),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken('User'));
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Створення користувача в БД', async () => {
    const user = await service.add(
      'testpass',
      'testuser',
      'testemail@gmail.com',
      '12345567890',
    );
    expect(user.username).toBe('testuser');

    const userInDb = await userModel.findOne({ username: 'testuser' });
    expect(userInDb).not.toBeNull();
  });
});
