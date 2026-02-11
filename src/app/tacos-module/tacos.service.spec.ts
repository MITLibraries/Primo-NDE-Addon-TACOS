import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TacosService } from './tacos.service';
import { TacosConfigService } from './tacos-config/tacos-config.service';
import { buildLogSearchEventQuery } from './tacos-query/tacos-query.builder';
describe('TacosService', () => {
  let service: TacosService;
  let httpTesting: HttpTestingController;
  let tacosConfigServiceMock: jasmine.SpyObj<TacosConfigService>;

  beforeEach(() => {
    tacosConfigServiceMock = jasmine.createSpyObj('TacosConfigService', ['getTacosUrl']);
    tacosConfigServiceMock.getTacosUrl.and.returnValue("fakeTacosURL")
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TacosService,
        { provide: TacosConfigService, useValue: tacosConfigServiceMock }
      ]
    });

    service = TestBed.inject(TacosService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should call POST with URL from TacosConfigService', () => {
    const searchTerm = 'foo';

    service.getTacosResponse(searchTerm).subscribe();

    const req = httpTesting.expectOne('fakeTacosURL');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.query).toBe(buildLogSearchEventQuery(searchTerm));
    expect(req.request.headers.get('Accept')).toBe('application/json');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush({});

  });
});
