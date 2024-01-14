package com.demo.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A HoaDon.
 */
@Entity
@Table(name = "hoa_don")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class HoaDon implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "tong_tien")
    private Long tongTien;

    @Column(name = "ngay_mua")
    private LocalDate ngayMua;

    @ManyToOne(fetch = FetchType.LAZY)
    private KhachHang khachHang;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public HoaDon id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTongTien() {
        return this.tongTien;
    }

    public HoaDon tongTien(Long tongTien) {
        this.setTongTien(tongTien);
        return this;
    }

    public void setTongTien(Long tongTien) {
        this.tongTien = tongTien;
    }

    public LocalDate getNgayMua() {
        return this.ngayMua;
    }

    public HoaDon ngayMua(LocalDate ngayMua) {
        this.setNgayMua(ngayMua);
        return this;
    }

    public void setNgayMua(LocalDate ngayMua) {
        this.ngayMua = ngayMua;
    }

    public KhachHang getKhachHang() {
        return this.khachHang;
    }

    public void setKhachHang(KhachHang khachHang) {
        this.khachHang = khachHang;
    }

    public HoaDon khachHang(KhachHang khachHang) {
        this.setKhachHang(khachHang);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HoaDon)) {
            return false;
        }
        return getId() != null && getId().equals(((HoaDon) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HoaDon{" +
            "id=" + getId() +
            ", tongTien=" + getTongTien() +
            ", ngayMua='" + getNgayMua() + "'" +
            "}";
    }
}
