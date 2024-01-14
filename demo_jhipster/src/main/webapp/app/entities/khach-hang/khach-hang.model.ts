export interface IKhachHang {
  id: number;
  tenKhachHang?: string | null;
  diaChi?: string | null;
}

export type NewKhachHang = Omit<IKhachHang, 'id'> & { id: null };
