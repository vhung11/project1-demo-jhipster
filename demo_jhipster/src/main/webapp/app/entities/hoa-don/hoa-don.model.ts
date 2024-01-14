import dayjs from 'dayjs/esm';
import { IKhachHang } from 'app/entities/khach-hang/khach-hang.model';

export interface IHoaDon {
  id: number;
  tongTien?: number | null;
  ngayMua?: dayjs.Dayjs | null;
  khachHang?: IKhachHang | null;
}

export type NewHoaDon = Omit<IHoaDon, 'id'> & { id: null };
