import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { TacosComponent, selectSearchTerm } from './tacos.component';
import { TacosService } from './tacos.service';

describe('TacosComponent', () => {
  let fixture: ComponentFixture<TacosComponent>;
  let component: TacosComponent;
  let tacosServiceMock: jasmine.SpyObj<TacosService>;
  const MOCK_TACOS_RESPONSE = {
    data: {
      logSearchEvent: {
        detectors: {
          suggestedResources: [
            { url: 'https://taco1.com', title: 'Taco One' },
            { url: 'https://taco2.com', title: 'Taco Two' }
          ]
        }
      }
    }
  };

  beforeEach(async () => {
    tacosServiceMock = jasmine.createSpyObj('TacosService', ['getTacosResponse']);
    tacosServiceMock.getTacosResponse.and.returnValue(of(MOCK_TACOS_RESPONSE));

    await TestBed.configureTestingModule({
      imports: [TacosComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectSearchTerm, value: 'foo' }
          ]
        }),
        { provide: TacosService, useValue: tacosServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TacosComponent);
    component = fixture.componentInstance;
  });

  it('calls the service when search term exists', () => {
    fixture.detectChanges();

    expect(tacosServiceMock.getTacosResponse).toHaveBeenCalledWith('foo');
  });
});
