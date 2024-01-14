import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../khach-hang.test-samples';

import { KhachHangFormService } from './khach-hang-form.service';

describe('KhachHang Form Service', () => {
  let service: KhachHangFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhachHangFormService);
  });

  describe('Service methods', () => {
    describe('createKhachHangFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createKhachHangFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tenKhachHang: expect.any(Object),
            diaChi: expect.any(Object),
          }),
        );
      });

      it('passing IKhachHang should create a new form with FormGroup', () => {
        const formGroup = service.createKhachHangFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            tenKhachHang: expect.any(Object),
            diaChi: expect.any(Object),
          }),
        );
      });
    });

    describe('getKhachHang', () => {
      it('should return NewKhachHang for default KhachHang initial value', () => {
        const formGroup = service.createKhachHangFormGroup(sampleWithNewData);

        const khachHang = service.getKhachHang(formGroup) as any;

        expect(khachHang).toMatchObject(sampleWithNewData);
      });

      it('should return NewKhachHang for empty KhachHang initial value', () => {
        const formGroup = service.createKhachHangFormGroup();

        const khachHang = service.getKhachHang(formGroup) as any;

        expect(khachHang).toMatchObject({});
      });

      it('should return IKhachHang', () => {
        const formGroup = service.createKhachHangFormGroup(sampleWithRequiredData);

        const khachHang = service.getKhachHang(formGroup) as any;

        expect(khachHang).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IKhachHang should not enable id FormControl', () => {
        const formGroup = service.createKhachHangFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewKhachHang should disable id FormControl', () => {
        const formGroup = service.createKhachHangFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
