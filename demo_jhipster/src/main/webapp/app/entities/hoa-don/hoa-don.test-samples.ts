import dayjs from 'dayjs/esm';

import { IHoaDon, NewHoaDon } from './hoa-don.model';

export const sampleWithRequiredData: IHoaDon = {
  id: 30440,
};

export const sampleWithPartialData: IHoaDon = {
  id: 8933,
  tongTien: 27813,
};

export const sampleWithFullData: IHoaDon = {
  id: 4600,
  tongTien: 13668,
  ngayMua: dayjs('2024-01-14'),
};

export const sampleWithNewData: NewHoaDon = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
