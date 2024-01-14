package com.demo.web.rest;

import com.demo.domain.HoaDon;
import com.demo.repository.HoaDonRepository;
import com.demo.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.demo.domain.HoaDon}.
 */
@RestController
@RequestMapping("/api/hoa-dons")
@Transactional
public class HoaDonResource {

    private final Logger log = LoggerFactory.getLogger(HoaDonResource.class);

    private static final String ENTITY_NAME = "hoaDon";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HoaDonRepository hoaDonRepository;

    public HoaDonResource(HoaDonRepository hoaDonRepository) {
        this.hoaDonRepository = hoaDonRepository;
    }

    /**
     * {@code POST  /hoa-dons} : Create a new hoaDon.
     *
     * @param hoaDon the hoaDon to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new hoaDon, or with status {@code 400 (Bad Request)} if the hoaDon has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<HoaDon> createHoaDon(@RequestBody HoaDon hoaDon) throws URISyntaxException {
        log.debug("REST request to save HoaDon : {}", hoaDon);
        if (hoaDon.getId() != null) {
            throw new BadRequestAlertException("A new hoaDon cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HoaDon result = hoaDonRepository.save(hoaDon);
        return ResponseEntity
            .created(new URI("/api/hoa-dons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /hoa-dons/:id} : Updates an existing hoaDon.
     *
     * @param id the id of the hoaDon to save.
     * @param hoaDon the hoaDon to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated hoaDon,
     * or with status {@code 400 (Bad Request)} if the hoaDon is not valid,
     * or with status {@code 500 (Internal Server Error)} if the hoaDon couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<HoaDon> updateHoaDon(@PathVariable(value = "id", required = false) final Long id, @RequestBody HoaDon hoaDon)
        throws URISyntaxException {
        log.debug("REST request to update HoaDon : {}, {}", id, hoaDon);
        if (hoaDon.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, hoaDon.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!hoaDonRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        HoaDon result = hoaDonRepository.save(hoaDon);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, hoaDon.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /hoa-dons/:id} : Partial updates given fields of an existing hoaDon, field will ignore if it is null
     *
     * @param id the id of the hoaDon to save.
     * @param hoaDon the hoaDon to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated hoaDon,
     * or with status {@code 400 (Bad Request)} if the hoaDon is not valid,
     * or with status {@code 404 (Not Found)} if the hoaDon is not found,
     * or with status {@code 500 (Internal Server Error)} if the hoaDon couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<HoaDon> partialUpdateHoaDon(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody HoaDon hoaDon
    ) throws URISyntaxException {
        log.debug("REST request to partial update HoaDon partially : {}, {}", id, hoaDon);
        if (hoaDon.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, hoaDon.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!hoaDonRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<HoaDon> result = hoaDonRepository
            .findById(hoaDon.getId())
            .map(existingHoaDon -> {
                if (hoaDon.getTongTien() != null) {
                    existingHoaDon.setTongTien(hoaDon.getTongTien());
                }
                if (hoaDon.getNgayMua() != null) {
                    existingHoaDon.setNgayMua(hoaDon.getNgayMua());
                }

                return existingHoaDon;
            })
            .map(hoaDonRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, hoaDon.getId().toString())
        );
    }

    /**
     * {@code GET  /hoa-dons} : get all the hoaDons.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of hoaDons in body.
     */
    @GetMapping("")
    public List<HoaDon> getAllHoaDons(@RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload) {
        log.debug("REST request to get all HoaDons");
        if (eagerload) {
            return hoaDonRepository.findAllWithEagerRelationships();
        } else {
            return hoaDonRepository.findAll();
        }
    }

    /**
     * {@code GET  /hoa-dons/:id} : get the "id" hoaDon.
     *
     * @param id the id of the hoaDon to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the hoaDon, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<HoaDon> getHoaDon(@PathVariable("id") Long id) {
        log.debug("REST request to get HoaDon : {}", id);
        Optional<HoaDon> hoaDon = hoaDonRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(hoaDon);
    }

    /**
     * {@code DELETE  /hoa-dons/:id} : delete the "id" hoaDon.
     *
     * @param id the id of the hoaDon to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHoaDon(@PathVariable("id") Long id) {
        log.debug("REST request to delete HoaDon : {}", id);
        hoaDonRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
