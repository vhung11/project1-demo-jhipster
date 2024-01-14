package com.demo.repository;

import com.demo.domain.HoaDon;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the HoaDon entity.
 */
@Repository
public interface HoaDonRepository extends JpaRepository<HoaDon, Long> {
    default Optional<HoaDon> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<HoaDon> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<HoaDon> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select hoaDon from HoaDon hoaDon left join fetch hoaDon.khachHang",
        countQuery = "select count(hoaDon) from HoaDon hoaDon"
    )
    Page<HoaDon> findAllWithToOneRelationships(Pageable pageable);

    @Query("select hoaDon from HoaDon hoaDon left join fetch hoaDon.khachHang")
    List<HoaDon> findAllWithToOneRelationships();

    @Query("select hoaDon from HoaDon hoaDon left join fetch hoaDon.khachHang where hoaDon.id =:id")
    Optional<HoaDon> findOneWithToOneRelationships(@Param("id") Long id);
}
