import { TestBed } from '@angular/core/testing';
import { TacosConfigService } from './tacos-config.service';
describe('ConfigService', () => {
  let service: TacosConfigService;
  const DEFAULT_TACOS_URL = 'https://tacos.libraries.mit.edu/graphql';

  describe('without MODULE_PARAMETERS', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(TacosConfigService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return default TACOS API URL when MODULE_PARAMETERS is not provided', () => {
      const url = service.getTacosUrl();
      expect(url).toBe(DEFAULT_TACOS_URL);
    });
  });

  describe('with MODULE_PARAMETERS containing tacosApiUrl', () => {
    const customTacosUrl = 'https://custom-tacos.example.com/graphql';

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          TacosConfigService,
          { provide: 'MODULE_PARAMETERS', useValue: { tacosUrl: customTacosUrl } }
        ]
      });
      service = TestBed.inject(TacosConfigService);
    });

    it('should return TACOS API URL from MODULE_PARAMETERS', () => {
      const url = service.getTacosUrl();
      expect(url).toBe(customTacosUrl);
    });
  });

  describe('with MODULE_PARAMETERS without tacosUrl', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          TacosConfigService,
          { provide: 'MODULE_PARAMETERS', useValue: { someOtherConfig: 'value' } }
        ]
      });
      service = TestBed.inject(TacosConfigService);
    });

    it('should return default TACOS API URL when tacosApiUrl is not in MODULE_PARAMETERS', () => {
      const url = service.getTacosUrl();
      expect(url).toBe(DEFAULT_TACOS_URL);
    });
  });

  describe('with empty MODULE_PARAMETERS', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          TacosConfigService,
          { provide: 'MODULE_PARAMETERS', useValue: {} }
        ]
      });
      service = TestBed.inject(TacosConfigService);
    });

    it('should return default TACOS API URL when MODULE_PARAMETERS is empty', () => {
      const url = service.getTacosUrl();
      expect(url).toBe(DEFAULT_TACOS_URL);
    });
  });
});
