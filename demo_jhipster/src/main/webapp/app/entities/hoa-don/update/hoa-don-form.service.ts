import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IHoaDon, NewHoaDon } from '../hoa-don.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IHoaDon for edit and NewHoaDonFormGroupInput for create.
 */
type HoaDonFormGroupInput = IHoaDon | PartialWithRequiredKeyOf<NewHoaDon>;

type HoaDonFormDefaults = Pick<NewHoaDon, 'id'>;

type HoaDonFormGroupContent = {
  id: FormControl<IHoaDon['id'] | NewHoaDon['id']>;
  tongTien: FormControl<IHoaDon['tongTien']>;
  ngayMua: FormControl<IHoaDon['ngayMua']>;
  khachHang: FormControl<IHoaDon['khachHang']>;
};

export type HoaDonFormGroup = FormGroup<HoaDonFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class HoaDonFormService {
  createHoaDonFormGroup(hoaDon: HoaDonFormGroupInput = { id: null }): HoaDonFormGroup {
    const hoaDonRawValue = {
      ...this.getFormDefaults(),
      ...hoaDon,
    };
    return new FormGroup<HoaDonFormGroupContent>({
      id: new FormControl(
        { value: hoaDonRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tongTien: new FormControl(hoaDonRawValue.tongTien),
      ngayMua: new FormControl(hoaDonRawValue.ngayMua),
      khachHang: new FormControl(hoaDonRawValue.khachHang),
    });
  }

  getHoaDon(form: HoaDonFormGroup): IHoaDon | NewHoaDon {
    return form.getRawValue() as IHoaDon | NewHoaDon;
  }

  resetForm(form: HoaDonFormGroup, hoaDon: HoaDonFormGroupInput): void {
    const hoaDonRawValue = { ...this.getFormDefaults(), ...hoaDon };
    form.reset(
      {
        ...hoaDonRawValue,
        id: { value: hoaDonRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): HoaDonFormDefaults {
    return {
      id: null,
    };
  }
}
