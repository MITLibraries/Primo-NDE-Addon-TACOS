import { fakeAsync, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TacosService } from './tacos.service';
import { TacosConfigService } from './tacos-config/tacos-config.service';
import { buildLogSearchEventQuery } from './tacos-query/tacos-query.builder';
describe('TacosService', () => {
  let service: TacosService;
  let httpTesting: HttpTestingController;
  let tacosConfigServiceMock: jasmine.SpyObj<TacosConfigService>;
  let fakeTacosUrl: string;
  beforeEach(() => {
    fakeTacosUrl = 'https://fake-tacos.test/graphql';
    tacosConfigServiceMock = jasmine.createSpyObj(
      'TacosConfigService',
      {},
      {
        tacosUrl: fakeTacosUrl,
      },
    );
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TacosService,
        { provide: TacosConfigService, useValue: tacosConfigServiceMock },
      ],
    });

    service = TestBed.inject(TacosService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });
  describe('getTacosResponse', () => {
    it('should make POST request to URL from TacosConfigService', () => {
      const searchTerm = 'foo';

      service.getTacosResponse(searchTerm).subscribe();

      const req = httpTesting.expectOne(fakeTacosUrl);
      expect(req.request.method).toBe('POST');
      req.flush({});
    });

    it('should send correct GraphQL query in request body', () => {
      const searchTerm = 'foo';

      service.getTacosResponse(searchTerm).subscribe();

      const req = httpTesting.expectOne(fakeTacosUrl);
      expect(req.request.body.query).toBe(buildLogSearchEventQuery(searchTerm));
      req.flush({});
    });

    it('should set correct headers', () => {
      const searchTerm = 'foo';

      service.getTacosResponse(searchTerm).subscribe();

      const req = httpTesting.expectOne(fakeTacosUrl);
      expect(req.request.headers.get('Accept')).toBe('application/json');
      expect(req.request.headers.get('Content-Type')).toBe('application/json');
      req.flush({});
    });
  });
});
