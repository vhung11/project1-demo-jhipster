import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { KhachHangService } from '../service/khach-hang.service';
import { IKhachHang } from '../khach-hang.model';
import { KhachHangFormService } from './khach-hang-form.service';

import { KhachHangUpdateComponent } from './khach-hang-update.component';

describe('KhachHang Management Update Component', () => {
  let comp: KhachHangUpdateComponent;
  let fixture: ComponentFixture<KhachHangUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let khachHangFormService: KhachHangFormService;
  let khachHangService: KhachHangService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), KhachHangUpdateComponent],
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
      .overrideTemplate(KhachHangUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(KhachHangUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    khachHangFormService = TestBed.inject(KhachHangFormService);
    khachHangService = TestBed.inject(KhachHangService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const khachHang: IKhachHang = { id: 456 };

      activatedRoute.data = of({ khachHang });
      comp.ngOnInit();

      expect(comp.khachHang).toEqual(khachHang);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKhachHang>>();
      const khachHang = { id: 123 };
      jest.spyOn(khachHangFormService, 'getKhachHang').mockReturnValue(khachHang);
      jest.spyOn(khachHangService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ khachHang });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: khachHang }));
      saveSubject.complete();

      // THEN
      expect(khachHangFormService.getKhachHang).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(khachHangService.update).toHaveBeenCalledWith(expect.objectContaining(khachHang));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKhachHang>>();
      const khachHang = { id: 123 };
      jest.spyOn(khachHangFormService, 'getKhachHang').mockReturnValue({ id: null });
      jest.spyOn(khachHangService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ khachHang: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: khachHang }));
      saveSubject.complete();

      // THEN
      expect(khachHangFormService.getKhachHang).toHaveBeenCalled();
      expect(khachHangService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IKhachHang>>();
      const khachHang = { id: 123 };
      jest.spyOn(khachHangService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ khachHang });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(khachHangService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
