import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'khach-hang',
    data: { pageTitle: 'demoJhipsterApp.khachHang.home.title' },
    loadChildren: () => import('./khach-hang/khach-hang.routes'),
  },
  {
    path: 'hoa-don',
    data: { pageTitle: 'demoJhipsterApp.hoaDon.home.title' },
    loadChildren: () => import('./hoa-don/hoa-don.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
