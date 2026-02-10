import { TestBed } from '@angular/core/testing';
import { provideHttpClient, } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TacosService } from './tacos.service';

describe('TacosService', () => {
  let service: TacosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()]
    });
    service = TestBed.inject(TacosService);
    const httpTesting = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
