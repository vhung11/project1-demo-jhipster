import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { KhachHangComponent } from './list/khach-hang.component';
import { KhachHangDetailComponent } from './detail/khach-hang-detail.component';
import { KhachHangUpdateComponent } from './update/khach-hang-update.component';
import KhachHangResolve from './route/khach-hang-routing-resolve.service';

const khachHangRoute: Routes = [
  {
    path: '',
    component: KhachHangComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: KhachHangDetailComponent,
    resolve: {
      khachHang: KhachHangResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: KhachHangUpdateComponent,
    resolve: {
      khachHang: KhachHangResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: KhachHangUpdateComponent,
    resolve: {
      khachHang: KhachHangResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default khachHangRoute;
