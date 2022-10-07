import assert from 'assert';
import { Server } from 'http';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import cookieParser from 'cookie-parser';
import request from 'supertest';
import { Connection } from 'typeorm';
import { IAuthRepository } from '@libs/auth';
import { MAX_PASSWORD_LENGTH, COOKIE, USER_ROLE } from '@libs/constants';
import { AuthRepository } from '@libs/auth/repositories';
import { AuthModule } from '../apps/api/src/auth/auth.module';
import { PREFIXES, ROUTES } from '../apps/api/src/routes';

describe('Auth', () => {
  let app: INestApplication;
  let server: Server;
  let authRepository: IAuthRepository;
  let connection: Connection;

  const userName = 'user';
  const userNotExistedPostfix = '$%@$EFFE@F@';

  const tooShortPassword = 'a';
  const tooLongPassword = 'a'.repeat(MAX_PASSWORD_LENGTH + 1);
  const validPassword = 'password';

  const getAuthTokens = async (): Promise<{
    accessToken: string;
    refreshToken: string;
  }> => {
    const tokens = await request(server)
      .post(`/${PREFIXES.AUTH}/${ROUTES.AUTH.SIGN_IN}`)
      .send({ login: userName, password: validPassword });

    const { body } = tokens;
    return body;
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.use(cookieParser());
    await app.init();

    server = app.getHttpServer();
    connection = app.get(Connection);
    authRepository = connection.getCustomRepository(AuthRepository);
  });

  describe('POST sign-up', () => {
    it('Too short password', async () => {
      await request(server)
        .post(`/${PREFIXES.AUTH}/${ROUTES.AUTH.SIGN_UP}`)
        .send({ login: userName, password: tooShortPassword })
        .expect(400);
    });

    it('Too long password', async () => {
      await request(server)
        .post(`/${PREFIXES.AUTH}/${ROUTES.AUTH.SIGN_UP}`)
        .send({ login: userName, password: tooLongPassword })
        .expect(400);
    });

    it('OK', async () => {
      await request(server)
        .post(`/${PREFIXES.AUTH}/${ROUTES.AUTH.SIGN_UP}`)
        .send({ login: userName, password: validPassword })
        .expect(200);
    });

    it('Already in use', async () => {
      await request(server)
        .post(`/${PREFIXES.AUTH}/${ROUTES.AUTH.SIGN_UP}`)
        .send({ login: userName, password: validPassword })
        .expect(400);
    });
  });

  describe('POST sign-in', () => {
    it('User not exists', async () => {
      await request(server)
        .post(`/${PREFIXES.AUTH}/${ROUTES.AUTH.SIGN_IN}`)
        .send({
          login: `${userName}${userNotExistedPostfix}`,
          password: validPassword,
        })
        .expect(404);
    });

    it('Incorrect password', async () => {
      await request(server)
        .post(`/${PREFIXES.AUTH}/${ROUTES.AUTH.SIGN_IN}`)
        .send({ login: userName, password: `${validPassword}1` })
        .expect(401);
    });

    it('OK', async () => {
      await request(server)
        .post(`/${PREFIXES.AUTH}/${ROUTES.AUTH.SIGN_IN}`)
        .send({ login: userName, password: validPassword })
        .expect(200);
    });
  });

  describe('POST sign-out', () => {
    it('Not authorized', async () => {
      await request(server)
        .post(`/${PREFIXES.AUTH}/${ROUTES.AUTH.SIGN_OUT}`)
        .send({})
        .expect(401);
    });

    it('OK', async () => {
      const { accessToken } = await getAuthTokens();

      await request(server)
        .post(`/${PREFIXES.AUTH}/${ROUTES.AUTH.SIGN_OUT}`)
        .set(COOKIE.ACCESS_TOKEN, accessToken)
        .send({})
        .expect(200);
    });
  });

  describe('GET me', () => {
    it('Not authorized', async () => {
      await request(server)
        .get(`/${PREFIXES.AUTH}/${ROUTES.AUTH.GET_ME}`)
        .expect(401);
    });

    it('OK', async () => {
      const { accessToken } = await getAuthTokens();

      const res = await request(server)
        .get(`/${PREFIXES.AUTH}/${ROUTES.AUTH.GET_ME}`)
        .set(COOKIE.ACCESS_TOKEN, accessToken)
        .expect(200);
      const { body } = res;
      assert.deepEqual(body, {
        login: userName,
        role: USER_ROLE.USER,
        id: body.id,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt,
        refreshToken: body.refreshToken,
      });
    });
  });

  describe('GET refresh', () => {
    it('Not authorized', async () => {
      await request(server)
        .get(`/${PREFIXES.AUTH}/${ROUTES.AUTH.REFRESH_TOKEN}`)
        .expect(401);
    });

    it('OK', async () => {
      const { refreshToken } = await getAuthTokens();

      await request(server)
        .get(`/${PREFIXES.AUTH}/${ROUTES.AUTH.REFRESH_TOKEN}`)
        .set('Cookie', [`${COOKIE.REFRESH_TOKEN}=${refreshToken}`])
        .expect(200);
    });
  });

  afterAll(async () => {
    await authRepository.delete({ login: userName });
    await app.close();
  });
});
