import { IKhachHang, NewKhachHang } from './khach-hang.model';

export const sampleWithRequiredData: IKhachHang = {
  id: 11721,
};

export const sampleWithPartialData: IKhachHang = {
  id: 30949,
  tenKhachHang: 'imperturbable storyboard',
  diaChi: 'scary',
};

export const sampleWithFullData: IKhachHang = {
  id: 17357,
  tenKhachHang: 'that',
  diaChi: 'fooey',
};

export const sampleWithNewData: NewKhachHang = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
