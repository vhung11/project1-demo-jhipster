import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IKhachHang } from '../khach-hang.model';
import { KhachHangService } from '../service/khach-hang.service';
import { KhachHangFormService, KhachHangFormGroup } from './khach-hang-form.service';

@Component({
  standalone: true,
  selector: 'jhi-khach-hang-update',
  templateUrl: './khach-hang-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class KhachHangUpdateComponent implements OnInit {
  isSaving = false;
  khachHang: IKhachHang | null = null;

  editForm: KhachHangFormGroup = this.khachHangFormService.createKhachHangFormGroup();

  constructor(
    protected khachHangService: KhachHangService,
    protected khachHangFormService: KhachHangFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ khachHang }) => {
      this.khachHang = khachHang;
      if (khachHang) {
        this.updateForm(khachHang);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const khachHang = this.khachHangFormService.getKhachHang(this.editForm);
    if (khachHang.id !== null) {
      this.subscribeToSaveResponse(this.khachHangService.update(khachHang));
    } else {
      this.subscribeToSaveResponse(this.khachHangService.create(khachHang));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IKhachHang>>): void {
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

  protected updateForm(khachHang: IKhachHang): void {
    this.khachHang = khachHang;
    this.khachHangFormService.resetForm(this.editForm, khachHang);
  }
}
