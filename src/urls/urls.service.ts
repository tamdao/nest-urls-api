import { Injectable } from '@nestjs/common';
import { SAMPLE_URLS } from './data';
import { SortOptions } from './dto/get-urls-query.dto';

export interface UrlEntry {
  url: string;
  priority: number;
}

@Injectable()
export class UrlsService {
  private urls: UrlEntry[] = SAMPLE_URLS;

  getUrls(priority?: number, sort?: SortOptions): UrlEntry[] {
    let filteredUrls = this.urls;

    if (priority !== undefined) {
      filteredUrls = filteredUrls.filter((url) => url.priority === priority);
    }

    if (sort) {
      const direction = sort.startsWith('-') ? -1 : 1;
      const attribute = sort.replace('-', '');

      filteredUrls = filteredUrls.sort((a, b) => {
        const isString =
          typeof a[attribute] === 'string' && typeof b[attribute] === 'string';

        if (isString) {
          return direction * a[attribute].localeCompare(b[attribute]);
        } else {
          return direction * ((a[attribute] as any) - (b[attribute] as any));
        }
      });
    }

    return filteredUrls;
  }
}
