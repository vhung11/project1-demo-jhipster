package com.demo.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class KhachHangTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static KhachHang getKhachHangSample1() {
        return new KhachHang().id(1L).tenKhachHang("tenKhachHang1").diaChi("diaChi1");
    }

    public static KhachHang getKhachHangSample2() {
        return new KhachHang().id(2L).tenKhachHang("tenKhachHang2").diaChi("diaChi2");
    }

    public static KhachHang getKhachHangRandomSampleGenerator() {
        return new KhachHang()
            .id(longCount.incrementAndGet())
            .tenKhachHang(UUID.randomUUID().toString())
            .diaChi(UUID.randomUUID().toString());
    }
}
