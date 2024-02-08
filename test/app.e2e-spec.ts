import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UrlsService } from './../src/urls/urls.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let urlsService: UrlsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    urlsService = moduleRef.get<UrlsService>(UrlsService);
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/urls (GET)', async () => {
    return request(app.getHttpServer())
      .get('/urls')
      .expect(200)
      .expect(await urlsService.getUrls());
  });

  it('/urls?priority=1 (GET)', async () => {
    return request(app.getHttpServer())
      .get('/urls?priority=1')
      .expect(200)
      .expect(await urlsService.getUrls(1));
  });

  it('/urls?sort=priority (GET)', async () => {
    return request(app.getHttpServer())
      .get('/urls?sort=priority')
      .expect(200)
      .expect(await urlsService.getUrls(undefined, 'priority'));
  });

  it('/urls?priority=invalid (GET) - Invalid priority', () => {
    return request(app.getHttpServer())
      .get('/urls?priority=invalid')
      .expect(400);
  });

  it('/urls?sort=invalid (GET) - Invalid sort option', () => {
    return request(app.getHttpServer()).get('/urls?sort=invalid').expect(400);
  });
});
