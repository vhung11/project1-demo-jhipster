import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { KhachHangService } from '../service/khach-hang.service';

import { KhachHangComponent } from './khach-hang.component';

describe('KhachHang Management Component', () => {
  let comp: KhachHangComponent;
  let fixture: ComponentFixture<KhachHangComponent>;
  let service: KhachHangService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'khach-hang', component: KhachHangComponent }]),
        HttpClientTestingModule,
        KhachHangComponent,
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
      .overrideTemplate(KhachHangComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(KhachHangComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(KhachHangService);

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
    expect(comp.khachHangs?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to khachHangService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getKhachHangIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getKhachHangIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
