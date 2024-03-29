import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { GeneralModule } from '../apps/api/src/general/general.module';
import { PREFIXES, ROUTES } from '../apps/api/src/routes';

describe('General', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [GeneralModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  describe('GET general', () => {
    it('Should OK', () => {
      return request(app.getHttpServer())
        .get(`/${PREFIXES.GENERAL}/${ROUTES.GENERAL.HELLO}`)
        .expect(200)
        .expect({ message: 'hello world' });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
