import { SAMPLE_REACHABLE_URLS, SAMPLE_URLS } from './data';
import { UrlsService } from './urls.service';

describe('UrlsService', () => {
  let service: UrlsService;

  beforeEach(() => {
    service = new UrlsService();
    service['urls'] = SAMPLE_URLS;
  });

  it('should return all URLs if no priority and sort are provided', async () => {
    const results = await service.getUrls();
    expect(results).toEqual(SAMPLE_REACHABLE_URLS);
  });

  it('should filter URLs by priority', async () => {
    const priority = 1;
    const filtered = await service.getUrls(priority);
    const allMatch = filtered.every((url) => url.priority === priority);
    expect(allMatch).toBeTruthy();
    expect(filtered.length).toBeLessThanOrEqual(service['urls'].length);
  });

  it('should sort URLs by priority in ascending order', async () => {
    const sorted = await service.getUrls(undefined, 'priority');
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].priority).toBeLessThanOrEqual(sorted[i + 1].priority);
    }
  });

  it('should sort URLs by priority in descending order', async () => {
    const sorted = await service.getUrls(undefined, '-priority');
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].priority).toBeGreaterThanOrEqual(sorted[i + 1].priority);
    }
  });

  it('should sort URLs alphabetically by URL in ascending order', async () => {
    const sorted = await service.getUrls(undefined, 'url');
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(
        sorted[i].url.localeCompare(sorted[i + 1].url),
      ).toBeLessThanOrEqual(0);
    }
  });

  it('should sort URLs alphabetically by URL in descending order', async () => {
    const sorted = await service.getUrls(undefined, '-url');
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(
        sorted[i].url.localeCompare(sorted[i + 1].url),
      ).toBeGreaterThanOrEqual(0);
    }
  });
});
