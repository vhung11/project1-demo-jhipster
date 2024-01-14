import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IKhachHang } from 'app/entities/khach-hang/khach-hang.model';
import { KhachHangService } from 'app/entities/khach-hang/service/khach-hang.service';
import { IHoaDon } from '../hoa-don.model';
import { HoaDonService } from '../service/hoa-don.service';
import { HoaDonFormService, HoaDonFormGroup } from './hoa-don-form.service';

@Component({
  standalone: true,
  selector: 'jhi-hoa-don-update',
  templateUrl: './hoa-don-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class HoaDonUpdateComponent implements OnInit {
  isSaving = false;
  hoaDon: IHoaDon | null = null;

  khachHangsSharedCollection: IKhachHang[] = [];

  editForm: HoaDonFormGroup = this.hoaDonFormService.createHoaDonFormGroup();

  constructor(
    protected hoaDonService: HoaDonService,
    protected hoaDonFormService: HoaDonFormService,
    protected khachHangService: KhachHangService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareKhachHang = (o1: IKhachHang | null, o2: IKhachHang | null): boolean => this.khachHangService.compareKhachHang(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hoaDon }) => {
      this.hoaDon = hoaDon;
      if (hoaDon) {
        this.updateForm(hoaDon);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const hoaDon = this.hoaDonFormService.getHoaDon(this.editForm);
    if (hoaDon.id !== null) {
      this.subscribeToSaveResponse(this.hoaDonService.update(hoaDon));
    } else {
      this.subscribeToSaveResponse(this.hoaDonService.create(hoaDon));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHoaDon>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(hoaDon: IHoaDon): void {
    this.hoaDon = hoaDon;
    this.hoaDonFormService.resetForm(this.editForm, hoaDon);

    this.khachHangsSharedCollection = this.khachHangService.addKhachHangToCollectionIfMissing<IKhachHang>(
      this.khachHangsSharedCollection,
      hoaDon.khachHang,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.khachHangService
      .query()
      .pipe(map((res: HttpResponse<IKhachHang[]>) => res.body ?? []))
      .pipe(
        map((khachHangs: IKhachHang[]) =>
          this.khachHangService.addKhachHangToCollectionIfMissing<IKhachHang>(khachHangs, this.hoaDon?.khachHang),
        ),
      )
      .subscribe((khachHangs: IKhachHang[]) => (this.khachHangsSharedCollection = khachHangs));
  }
}
