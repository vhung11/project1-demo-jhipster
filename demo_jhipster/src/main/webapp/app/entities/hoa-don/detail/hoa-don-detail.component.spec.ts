import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HoaDonDetailComponent } from './hoa-don-detail.component';

describe('HoaDon Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoaDonDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: HoaDonDetailComponent,
              resolve: { hoaDon: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(HoaDonDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load hoaDon on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', HoaDonDetailComponent);

      // THEN
      expect(instance.hoaDon).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
