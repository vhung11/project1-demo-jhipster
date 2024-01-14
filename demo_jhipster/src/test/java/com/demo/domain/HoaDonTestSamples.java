package com.demo.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class HoaDonTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static HoaDon getHoaDonSample1() {
        return new HoaDon().id(1L).tongTien(1L);
    }

    public static HoaDon getHoaDonSample2() {
        return new HoaDon().id(2L).tongTien(2L);
    }

    public static HoaDon getHoaDonRandomSampleGenerator() {
        return new HoaDon().id(longCount.incrementAndGet()).tongTien(longCount.incrementAndGet());
    }
}
