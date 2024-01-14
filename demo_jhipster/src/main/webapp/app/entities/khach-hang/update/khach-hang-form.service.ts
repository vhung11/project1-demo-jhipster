import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IKhachHang, NewKhachHang } from '../khach-hang.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IKhachHang for edit and NewKhachHangFormGroupInput for create.
 */
type KhachHangFormGroupInput = IKhachHang | PartialWithRequiredKeyOf<NewKhachHang>;

type KhachHangFormDefaults = Pick<NewKhachHang, 'id'>;

type KhachHangFormGroupContent = {
  id: FormControl<IKhachHang['id'] | NewKhachHang['id']>;
  tenKhachHang: FormControl<IKhachHang['tenKhachHang']>;
  diaChi: FormControl<IKhachHang['diaChi']>;
};

export type KhachHangFormGroup = FormGroup<KhachHangFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class KhachHangFormService {
  createKhachHangFormGroup(khachHang: KhachHangFormGroupInput = { id: null }): KhachHangFormGroup {
    const khachHangRawValue = {
      ...this.getFormDefaults(),
      ...khachHang,
    };
    return new FormGroup<KhachHangFormGroupContent>({
      id: new FormControl(
        { value: khachHangRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      tenKhachHang: new FormControl(khachHangRawValue.tenKhachHang),
      diaChi: new FormControl(khachHangRawValue.diaChi),
    });
  }

  getKhachHang(form: KhachHangFormGroup): IKhachHang | NewKhachHang {
    return form.getRawValue() as IKhachHang | NewKhachHang;
  }

  resetForm(form: KhachHangFormGroup, khachHang: KhachHangFormGroupInput): void {
    const khachHangRawValue = { ...this.getFormDefaults(), ...khachHang };
    form.reset(
      {
        ...khachHangRawValue,
        id: { value: khachHangRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): KhachHangFormDefaults {
    return {
      id: null,
    };
  }
}
