import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetUrlsQueryDto } from './dto/get-urls-query.dto';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getUrls(@Query() query: GetUrlsQueryDto) {
    return this.urlsService.getUrls(query.priority, query.sort);
  }
}
