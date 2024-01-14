package com.demo.repository;

import com.demo.domain.KhachHang;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the KhachHang entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KhachHangRepository extends JpaRepository<KhachHang, Long> {}
