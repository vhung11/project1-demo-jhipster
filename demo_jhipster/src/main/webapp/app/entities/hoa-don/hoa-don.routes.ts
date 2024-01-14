import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { HoaDonComponent } from './list/hoa-don.component';
import { HoaDonDetailComponent } from './detail/hoa-don-detail.component';
import { HoaDonUpdateComponent } from './update/hoa-don-update.component';
import HoaDonResolve from './route/hoa-don-routing-resolve.service';

const hoaDonRoute: Routes = [
  {
    path: '',
    component: HoaDonComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HoaDonDetailComponent,
    resolve: {
      hoaDon: HoaDonResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HoaDonUpdateComponent,
    resolve: {
      hoaDon: HoaDonResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HoaDonUpdateComponent,
    resolve: {
      hoaDon: HoaDonResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default hoaDonRoute;
