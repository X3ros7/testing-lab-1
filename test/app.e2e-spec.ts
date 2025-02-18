import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 10000);

  afterAll(async () => {
    await app.close();
  }, 10000);

  it('Реєстрація нового користувача', async () => {
    return request(app.getHttpServer())
      .post('/auth/register/email')
      .send({
        username: 'testuser',
        password: 'testpass',
        email: 'testemail@gmail.com',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
      });
  }, 10000);

  it('Логін користувача', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'testemail@gmail.com', password: 'testpass' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('access_token');
      });
  }, 10000);

  it('Невірний пароль', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'testemail@gmail.com', password: 'wrongpass' })
      .expect(401);
  }, 10000);
});
