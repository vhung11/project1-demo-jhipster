package com.demo.domain;

import static com.demo.domain.HoaDonTestSamples.*;
import static com.demo.domain.KhachHangTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.demo.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class HoaDonTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HoaDon.class);
        HoaDon hoaDon1 = getHoaDonSample1();
        HoaDon hoaDon2 = new HoaDon();
        assertThat(hoaDon1).isNotEqualTo(hoaDon2);

        hoaDon2.setId(hoaDon1.getId());
        assertThat(hoaDon1).isEqualTo(hoaDon2);

        hoaDon2 = getHoaDonSample2();
        assertThat(hoaDon1).isNotEqualTo(hoaDon2);
    }

    @Test
    void khachHangTest() throws Exception {
        HoaDon hoaDon = getHoaDonRandomSampleGenerator();
        KhachHang khachHangBack = getKhachHangRandomSampleGenerator();

        hoaDon.setKhachHang(khachHangBack);
        assertThat(hoaDon.getKhachHang()).isEqualTo(khachHangBack);

        hoaDon.khachHang(null);
        assertThat(hoaDon.getKhachHang()).isNull();
    }
}
