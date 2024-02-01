import { Test, TestingModule } from '@nestjs/testing';
import { SortOptions } from './dto/get-urls-query.dto';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';

describe('UrlsController', () => {
  let controller: UrlsController;
  let service: UrlsService;

  beforeEach(async () => {
    const mockUrlsService = {
      getUrls: jest.fn(() => Promise.resolve([])),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UrlsController],
      providers: [
        {
          provide: UrlsService,
          useValue: mockUrlsService,
        },
      ],
    }).compile();

    controller = moduleRef.get<UrlsController>(UrlsController);
    service = moduleRef.get<UrlsService>(UrlsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUrls', () => {
    it('should call UrlsService.getUrls with the correct parameters', async () => {
      const priority = 1;
      const sort: SortOptions = 'priority';

      await controller.getUrls({ priority, sort });

      expect(service.getUrls).toHaveBeenCalledWith(priority, sort);
    });

    it('should handle requests without query parameters', async () => {
      await controller.getUrls({});
      expect(service.getUrls).toHaveBeenCalledWith(undefined, undefined);
    });

    it('should handle different sort options', async () => {
      const sortOptions: SortOptions[] = [
        'priority',
        '-priority',
        'url',
        '-url',
      ];

      for (const sort of sortOptions) {
        await controller.getUrls({ sort });
        expect(service.getUrls).toHaveBeenCalledWith(undefined, sort);
      }
    });
  });
});
