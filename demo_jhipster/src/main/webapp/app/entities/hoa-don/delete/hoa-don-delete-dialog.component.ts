import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IHoaDon } from '../hoa-don.model';
import { HoaDonService } from '../service/hoa-don.service';

@Component({
  standalone: true,
  templateUrl: './hoa-don-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class HoaDonDeleteDialogComponent {
  hoaDon?: IHoaDon;

  constructor(
    protected hoaDonService: HoaDonService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.hoaDonService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
