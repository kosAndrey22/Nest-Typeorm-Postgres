import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import assert from 'assert';
import { Server } from 'http';
import { AuthLibModule } from '@libs/auth';
import { MAX_PASSWORD_LENGTH, COOKIE, USER_ROLE, INJECT_TOKENS } from '@libs/constants';
import { DbLibModule, TypeORMConfig } from '@libs/db';
import { IUsersRepository } from '@libs/interfaces';

describe('Auth', () => {
  let app: INestApplication;
  let server: Server;
  let usersRepository: IUsersRepository;

  const authPrefix = '/auth'

  const userName = 'user';
  const userNotExistedPostfix = '$%@$EFFE@F@';

  const tooShortPassword = 'a';
  const tooLongPassword = 'a'.repeat(MAX_PASSWORD_LENGTH + 1);
  const validPassword = 'password';

  const getAuthTokens = async (): Promise<{ accessToken: string, refreshToken: string}> => {
    const tokens = await request(server)
      .post(`${authPrefix}/sign-in`)
      .send({ login: userName, password: validPassword })

    const { body } = tokens;
    return body;
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthLibModule, DbLibModule, TypeOrmModule.forRoot(TypeORMConfig)],
    })
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe(),
    );
    app.use(cookieParser());
    await app.init();

    server = app.getHttpServer();
    usersRepository = app.get(INJECT_TOKENS.REPOSITORIES.USERS_REPOSITORY);
  });

  describe('POST sign-up', () => {

    it('Too short password', async () => {
      await request(server)
        .post(`${authPrefix}/sign-up`)
        .send({ login: userName, password: tooShortPassword })
        .expect(400)
    })

    it('Too long password', async () => {
      await request(server)
        .post(`${authPrefix}/sign-up`)
        .send({ login: userName, password: tooLongPassword })
        .expect(400)
    })

    it('OK', async () => {
      await request(server)
        .post(`${authPrefix}/sign-up`)
        .send({ login: userName, password: validPassword })
        .expect(200)
    })

    it('Already in use', async () => {
      await request(server)
        .post(`${authPrefix}/sign-up`)
        .send({ login: userName, password: validPassword })
        .expect(400)
    })

  });

  describe('POST sign-in', () => {

    it('Too short password', async () => {
      await request(server)
        .post(`${authPrefix}/sign-in`)
        .send({ login: userName, password: tooShortPassword })
        .expect(400)
    })

    it('Too long password', async () => {
      await request(server)
        .post(`${authPrefix}/sign-in`)
        .send({ login: userName, password: tooLongPassword })
        .expect(400)
    })

    it('User not exists', async () => {
      await request(server)
        .post(`${authPrefix}/sign-in`)
        .send({ login: `${userName}${userNotExistedPostfix}`, password: validPassword })
        .expect(404)
    })

    it('Incorrect password', async () => {
      await request(server)
        .post(`${authPrefix}/sign-in`)
        .send({ login: userName, password: `${validPassword}1` })
        .expect(401)
    })

    it('OK', async () => {
      await request(server)
        .post(`${authPrefix}/sign-in`)
        .send({ login: userName, password: validPassword })
        .expect(200)
    })

  });

  describe('POST sign-out', () => {

    it('Not authorized', async () => {
      await request(server)
        .post(`${authPrefix}/sign-out`)
        .send({ })
        .expect(401)
    })

    it('OK', async () => {
      const { accessToken } = await getAuthTokens();

      await request(server)
        .post(`${authPrefix}/sign-out`)
        .set(COOKIE.ACCESS_TOKEN, accessToken)
        .send({})
        .expect(200)
    })

  })

  describe('GET me', () => {

    it('Not authorized', async () => {
      await request(server)
        .get(`${authPrefix}/me`)
        .expect(401)
    })

    it('OK', async () => {
      const { accessToken } = await getAuthTokens();

      const res = await request(server)
        .get(`${authPrefix}/me`)
        .set(COOKIE.ACCESS_TOKEN, accessToken)
        .expect(200)
      assert.deepEqual(res.body, {
        login: userName,
        role: USER_ROLE.USER,
        id: res.body.id,
        createdAt: res.body.createdAt,
        updatedAt: res.body.updatedAt,
      })
    })

  })

  describe('GET refresh', () => {

    it('Not authorized', async () => {
      await request(server)
        .get(`${authPrefix}/refresh`)
        .expect(401)
    })

    it('OK', async () => {
      const { refreshToken } = await getAuthTokens();

      await request(server)
        .get(`${authPrefix}/refresh`)
        .set('Cookie', [`${COOKIE.REFRESH_TOKEN}=${refreshToken}`])
        .expect(200)
    })

  })

  afterAll(async () => {
    await usersRepository.delete({ login: userName });
    await app.close();
  });

})
