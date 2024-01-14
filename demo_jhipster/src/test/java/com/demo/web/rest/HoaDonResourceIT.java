package com.demo.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.demo.IntegrationTest;
import com.demo.domain.HoaDon;
import com.demo.repository.HoaDonRepository;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link HoaDonResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class HoaDonResourceIT {

    private static final Long DEFAULT_TONG_TIEN = 1L;
    private static final Long UPDATED_TONG_TIEN = 2L;

    private static final LocalDate DEFAULT_NGAY_MUA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_NGAY_MUA = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/hoa-dons";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private HoaDonRepository hoaDonRepository;

    @Mock
    private HoaDonRepository hoaDonRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restHoaDonMockMvc;

    private HoaDon hoaDon;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HoaDon createEntity(EntityManager em) {
        HoaDon hoaDon = new HoaDon().tongTien(DEFAULT_TONG_TIEN).ngayMua(DEFAULT_NGAY_MUA);
        return hoaDon;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HoaDon createUpdatedEntity(EntityManager em) {
        HoaDon hoaDon = new HoaDon().tongTien(UPDATED_TONG_TIEN).ngayMua(UPDATED_NGAY_MUA);
        return hoaDon;
    }

    @BeforeEach
    public void initTest() {
        hoaDon = createEntity(em);
    }

    @Test
    @Transactional
    void createHoaDon() throws Exception {
        int databaseSizeBeforeCreate = hoaDonRepository.findAll().size();
        // Create the HoaDon
        restHoaDonMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hoaDon)))
            .andExpect(status().isCreated());

        // Validate the HoaDon in the database
        List<HoaDon> hoaDonList = hoaDonRepository.findAll();
        assertThat(hoaDonList).hasSize(databaseSizeBeforeCreate + 1);
        HoaDon testHoaDon = hoaDonList.get(hoaDonList.size() - 1);
        assertThat(testHoaDon.getTongTien()).isEqualTo(DEFAULT_TONG_TIEN);
        assertThat(testHoaDon.getNgayMua()).isEqualTo(DEFAULT_NGAY_MUA);
    }

    @Test
    @Transactional
    void createHoaDonWithExistingId() throws Exception {
        // Create the HoaDon with an existing ID
        hoaDon.setId(1L);

        int databaseSizeBeforeCreate = hoaDonRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restHoaDonMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hoaDon)))
            .andExpect(status().isBadRequest());

        // Validate the HoaDon in the database
        List<HoaDon> hoaDonList = hoaDonRepository.findAll();
        assertThat(hoaDonList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllHoaDons() throws Exception {
        // Initialize the database
        hoaDonRepository.saveAndFlush(hoaDon);

        // Get all the hoaDonList
        restHoaDonMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(hoaDon.getId().intValue())))
            .andExpect(jsonPath("$.[*].tongTien").value(hasItem(DEFAULT_TONG_TIEN.intValue())))
            .andExpect(jsonPath("$.[*].ngayMua").value(hasItem(DEFAULT_NGAY_MUA.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllHoaDonsWithEagerRelationshipsIsEnabled() throws Exception {
        when(hoaDonRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restHoaDonMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(hoaDonRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllHoaDonsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(hoaDonRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restHoaDonMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(hoaDonRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getHoaDon() throws Exception {
        // Initialize the database
        hoaDonRepository.saveAndFlush(hoaDon);

        // Get the hoaDon
        restHoaDonMockMvc
            .perform(get(ENTITY_API_URL_ID, hoaDon.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(hoaDon.getId().intValue()))
            .andExpect(jsonPath("$.tongTien").value(DEFAULT_TONG_TIEN.intValue()))
            .andExpect(jsonPath("$.ngayMua").value(DEFAULT_NGAY_MUA.toString()));
    }

    @Test
    @Transactional
    void getNonExistingHoaDon() throws Exception {
        // Get the hoaDon
        restHoaDonMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingHoaDon() throws Exception {
        // Initialize the database
        hoaDonRepository.saveAndFlush(hoaDon);

        int databaseSizeBeforeUpdate = hoaDonRepository.findAll().size();

        // Update the hoaDon
        HoaDon updatedHoaDon = hoaDonRepository.findById(hoaDon.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedHoaDon are not directly saved in db
        em.detach(updatedHoaDon);
        updatedHoaDon.tongTien(UPDATED_TONG_TIEN).ngayMua(UPDATED_NGAY_MUA);

        restHoaDonMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedHoaDon.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedHoaDon))
            )
            .andExpect(status().isOk());

        // Validate the HoaDon in the database
        List<HoaDon> hoaDonList = hoaDonRepository.findAll();
        assertThat(hoaDonList).hasSize(databaseSizeBeforeUpdate);
        HoaDon testHoaDon = hoaDonList.get(hoaDonList.size() - 1);
        assertThat(testHoaDon.getTongTien()).isEqualTo(UPDATED_TONG_TIEN);
        assertThat(testHoaDon.getNgayMua()).isEqualTo(UPDATED_NGAY_MUA);
    }

    @Test
    @Transactional
    void putNonExistingHoaDon() throws Exception {
        int databaseSizeBeforeUpdate = hoaDonRepository.findAll().size();
        hoaDon.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHoaDonMockMvc
            .perform(
                put(ENTITY_API_URL_ID, hoaDon.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(hoaDon))
            )
            .andExpect(status().isBadRequest());

        // Validate the HoaDon in the database
        List<HoaDon> hoaDonList = hoaDonRepository.findAll();
        assertThat(hoaDonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchHoaDon() throws Exception {
        int databaseSizeBeforeUpdate = hoaDonRepository.findAll().size();
        hoaDon.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHoaDonMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(hoaDon))
            )
            .andExpect(status().isBadRequest());

        // Validate the HoaDon in the database
        List<HoaDon> hoaDonList = hoaDonRepository.findAll();
        assertThat(hoaDonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamHoaDon() throws Exception {
        int databaseSizeBeforeUpdate = hoaDonRepository.findAll().size();
        hoaDon.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHoaDonMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(hoaDon)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the HoaDon in the database
        List<HoaDon> hoaDonList = hoaDonRepository.findAll();
        assertThat(hoaDonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateHoaDonWithPatch() throws Exception {
        // Initialize the database
        hoaDonRepository.saveAndFlush(hoaDon);

        int databaseSizeBeforeUpdate = hoaDonRepository.findAll().size();

        // Update the hoaDon using partial update
        HoaDon partialUpdatedHoaDon = new HoaDon();
        partialUpdatedHoaDon.setId(hoaDon.getId());

        partialUpdatedHoaDon.ngayMua(UPDATED_NGAY_MUA);

        restHoaDonMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHoaDon.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHoaDon))
            )
            .andExpect(status().isOk());

        // Validate the HoaDon in the database
        List<HoaDon> hoaDonList = hoaDonRepository.findAll();
        assertThat(hoaDonList).hasSize(databaseSizeBeforeUpdate);
        HoaDon testHoaDon = hoaDonList.get(hoaDonList.size() - 1);
        assertThat(testHoaDon.getTongTien()).isEqualTo(DEFAULT_TONG_TIEN);
        assertThat(testHoaDon.getNgayMua()).isEqualTo(UPDATED_NGAY_MUA);
    }

    @Test
    @Transactional
    void fullUpdateHoaDonWithPatch() throws Exception {
        // Initialize the database
        hoaDonRepository.saveAndFlush(hoaDon);

        int databaseSizeBeforeUpdate = hoaDonRepository.findAll().size();

        // Update the hoaDon using partial update
        HoaDon partialUpdatedHoaDon = new HoaDon();
        partialUpdatedHoaDon.setId(hoaDon.getId());

        partialUpdatedHoaDon.tongTien(UPDATED_TONG_TIEN).ngayMua(UPDATED_NGAY_MUA);

        restHoaDonMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedHoaDon.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedHoaDon))
            )
            .andExpect(status().isOk());

        // Validate the HoaDon in the database
        List<HoaDon> hoaDonList = hoaDonRepository.findAll();
        assertThat(hoaDonList).hasSize(databaseSizeBeforeUpdate);
        HoaDon testHoaDon = hoaDonList.get(hoaDonList.size() - 1);
        assertThat(testHoaDon.getTongTien()).isEqualTo(UPDATED_TONG_TIEN);
        assertThat(testHoaDon.getNgayMua()).isEqualTo(UPDATED_NGAY_MUA);
    }

    @Test
    @Transactional
    void patchNonExistingHoaDon() throws Exception {
        int databaseSizeBeforeUpdate = hoaDonRepository.findAll().size();
        hoaDon.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHoaDonMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, hoaDon.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(hoaDon))
            )
            .andExpect(status().isBadRequest());

        // Validate the HoaDon in the database
        List<HoaDon> hoaDonList = hoaDonRepository.findAll();
        assertThat(hoaDonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchHoaDon() throws Exception {
        int databaseSizeBeforeUpdate = hoaDonRepository.findAll().size();
        hoaDon.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHoaDonMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(hoaDon))
            )
            .andExpect(status().isBadRequest());

        // Validate the HoaDon in the database
        List<HoaDon> hoaDonList = hoaDonRepository.findAll();
        assertThat(hoaDonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamHoaDon() throws Exception {
        int databaseSizeBeforeUpdate = hoaDonRepository.findAll().size();
        hoaDon.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restHoaDonMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(hoaDon)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the HoaDon in the database
        List<HoaDon> hoaDonList = hoaDonRepository.findAll();
        assertThat(hoaDonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteHoaDon() throws Exception {
        // Initialize the database
        hoaDonRepository.saveAndFlush(hoaDon);

        int databaseSizeBeforeDelete = hoaDonRepository.findAll().size();

        // Delete the hoaDon
        restHoaDonMockMvc
            .perform(delete(ENTITY_API_URL_ID, hoaDon.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HoaDon> hoaDonList = hoaDonRepository.findAll();
        assertThat(hoaDonList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
