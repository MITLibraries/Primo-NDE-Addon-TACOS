import { TestBed } from '@angular/core/testing';
import { TacosConfigService } from './tacos-config.service';
import { TACOS_CONFIG_DEFAULTS } from './tacos-config.constants';
describe('ConfigService', () => {
  let service: TacosConfigService;


  describe('without MODULE_PARAMETERS', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(TacosConfigService);
    });

    it('should return defaults when MODULE_PARAMETERS is not provided', () => {
      expect(service.tacosUrl).toBe(TACOS_CONFIG_DEFAULTS.tacosUrl);
      expect(service.displayRecs).toBe(TACOS_CONFIG_DEFAULTS.displayRecs);
    });
    it('should return default display flag when MODULE_PARAMETERS is not provided', () => {
      const flag = service.displayRecs;

    })
  });

  describe('with expected keys in MODULE_PARAMETERS', () => {
    const fakeTacosUrl = 'https://custom-tacos.example.com/graphql';
    const fakedisplayRecs = false
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          TacosConfigService,
          { provide: 'MODULE_PARAMETERS', useValue: { tacosUrl: fakeTacosUrl, displayRecs: fakedisplayRecs } }
        ]
      });
      service = TestBed.inject(TacosConfigService);
    });

    it('should return the expected values from MODULE_PARAMETERS', () => {
      expect(service.tacosUrl).toBe(fakeTacosUrl);
      expect(service.displayRecs).toBe(fakedisplayRecs);
    });
  });

  describe('with MODULE_PARAMETERS without the expected keys ', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          TacosConfigService,
          { provide: 'MODULE_PARAMETERS', useValue: { someOtherConfig: 'value' } }
        ]
      });
      service = TestBed.inject(TacosConfigService);
    });

    it('should use the defaults', () => {
      expect(service.tacosUrl).toBe(TACOS_CONFIG_DEFAULTS.tacosUrl);
      expect(service.displayRecs).toBe(TACOS_CONFIG_DEFAULTS.displayRecs);

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

    it('should use the defaults', () => {
      expect(service.tacosUrl).toBe(TACOS_CONFIG_DEFAULTS.tacosUrl);
      expect(service.displayRecs).toBe(TACOS_CONFIG_DEFAULTS.displayRecs)
    });
  });
});
