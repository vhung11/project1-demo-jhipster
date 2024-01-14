import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IKhachHang } from '../khach-hang.model';
import { KhachHangService } from '../service/khach-hang.service';

@Component({
  standalone: true,
  templateUrl: './khach-hang-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class KhachHangDeleteDialogComponent {
  khachHang?: IKhachHang;

  constructor(
    protected khachHangService: KhachHangService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.khachHangService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
