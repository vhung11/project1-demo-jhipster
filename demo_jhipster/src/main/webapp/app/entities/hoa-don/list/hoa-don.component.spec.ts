import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HoaDonService } from '../service/hoa-don.service';

import { HoaDonComponent } from './hoa-don.component';

describe('HoaDon Management Component', () => {
  let comp: HoaDonComponent;
  let fixture: ComponentFixture<HoaDonComponent>;
  let service: HoaDonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'hoa-don', component: HoaDonComponent }]),
        HttpClientTestingModule,
        HoaDonComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              }),
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(HoaDonComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HoaDonComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(HoaDonService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        }),
      ),
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.hoaDons?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to hoaDonService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getHoaDonIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getHoaDonIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
