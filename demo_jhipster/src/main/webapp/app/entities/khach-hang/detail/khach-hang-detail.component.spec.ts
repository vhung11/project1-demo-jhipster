import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { KhachHangDetailComponent } from './khach-hang-detail.component';

describe('KhachHang Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KhachHangDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: KhachHangDetailComponent,
              resolve: { khachHang: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(KhachHangDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load khachHang on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', KhachHangDetailComponent);

      // THEN
      expect(instance.khachHang).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
