import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IKhachHang } from '../khach-hang.model';
import { KhachHangService } from '../service/khach-hang.service';

export const khachHangResolve = (route: ActivatedRouteSnapshot): Observable<null | IKhachHang> => {
  const id = route.params['id'];
  if (id) {
    return inject(KhachHangService)
      .find(id)
      .pipe(
        mergeMap((khachHang: HttpResponse<IKhachHang>) => {
          if (khachHang.body) {
            return of(khachHang.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default khachHangResolve;
