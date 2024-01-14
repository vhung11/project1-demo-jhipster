import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IKhachHang } from 'app/entities/khach-hang/khach-hang.model';
import { KhachHangService } from 'app/entities/khach-hang/service/khach-hang.service';
import { HoaDonService } from '../service/hoa-don.service';
import { IHoaDon } from '../hoa-don.model';
import { HoaDonFormService } from './hoa-don-form.service';

import { HoaDonUpdateComponent } from './hoa-don-update.component';

describe('HoaDon Management Update Component', () => {
  let comp: HoaDonUpdateComponent;
  let fixture: ComponentFixture<HoaDonUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let hoaDonFormService: HoaDonFormService;
  let hoaDonService: HoaDonService;
  let khachHangService: KhachHangService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), HoaDonUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(HoaDonUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(HoaDonUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    hoaDonFormService = TestBed.inject(HoaDonFormService);
    hoaDonService = TestBed.inject(HoaDonService);
    khachHangService = TestBed.inject(KhachHangService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call KhachHang query and add missing value', () => {
      const hoaDon: IHoaDon = { id: 456 };
      const khachHang: IKhachHang = { id: 7096 };
      hoaDon.khachHang = khachHang;

      const khachHangCollection: IKhachHang[] = [{ id: 1705 }];
      jest.spyOn(khachHangService, 'query').mockReturnValue(of(new HttpResponse({ body: khachHangCollection })));
      const additionalKhachHangs = [khachHang];
      const expectedCollection: IKhachHang[] = [...additionalKhachHangs, ...khachHangCollection];
      jest.spyOn(khachHangService, 'addKhachHangToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ hoaDon });
      comp.ngOnInit();

      expect(khachHangService.query).toHaveBeenCalled();
      expect(khachHangService.addKhachHangToCollectionIfMissing).toHaveBeenCalledWith(
        khachHangCollection,
        ...additionalKhachHangs.map(expect.objectContaining),
      );
      expect(comp.khachHangsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const hoaDon: IHoaDon = { id: 456 };
      const khachHang: IKhachHang = { id: 32293 };
      hoaDon.khachHang = khachHang;

      activatedRoute.data = of({ hoaDon });
      comp.ngOnInit();

      expect(comp.khachHangsSharedCollection).toContain(khachHang);
      expect(comp.hoaDon).toEqual(hoaDon);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHoaDon>>();
      const hoaDon = { id: 123 };
      jest.spyOn(hoaDonFormService, 'getHoaDon').mockReturnValue(hoaDon);
      jest.spyOn(hoaDonService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hoaDon });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hoaDon }));
      saveSubject.complete();

      // THEN
      expect(hoaDonFormService.getHoaDon).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(hoaDonService.update).toHaveBeenCalledWith(expect.objectContaining(hoaDon));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHoaDon>>();
      const hoaDon = { id: 123 };
      jest.spyOn(hoaDonFormService, 'getHoaDon').mockReturnValue({ id: null });
      jest.spyOn(hoaDonService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hoaDon: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: hoaDon }));
      saveSubject.complete();

      // THEN
      expect(hoaDonFormService.getHoaDon).toHaveBeenCalled();
      expect(hoaDonService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IHoaDon>>();
      const hoaDon = { id: 123 };
      jest.spyOn(hoaDonService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ hoaDon });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(hoaDonService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareKhachHang', () => {
      it('Should forward to khachHangService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(khachHangService, 'compareKhachHang');
        comp.compareKhachHang(entity, entity2);
        expect(khachHangService.compareKhachHang).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
