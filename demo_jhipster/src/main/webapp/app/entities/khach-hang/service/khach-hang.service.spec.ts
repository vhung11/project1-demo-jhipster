import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IKhachHang } from '../khach-hang.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../khach-hang.test-samples';

import { KhachHangService } from './khach-hang.service';

const requireRestSample: IKhachHang = {
  ...sampleWithRequiredData,
};

describe('KhachHang Service', () => {
  let service: KhachHangService;
  let httpMock: HttpTestingController;
  let expectedResult: IKhachHang | IKhachHang[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(KhachHangService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a KhachHang', () => {
      const khachHang = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(khachHang).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a KhachHang', () => {
      const khachHang = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(khachHang).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a KhachHang', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of KhachHang', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a KhachHang', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addKhachHangToCollectionIfMissing', () => {
      it('should add a KhachHang to an empty array', () => {
        const khachHang: IKhachHang = sampleWithRequiredData;
        expectedResult = service.addKhachHangToCollectionIfMissing([], khachHang);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(khachHang);
      });

      it('should not add a KhachHang to an array that contains it', () => {
        const khachHang: IKhachHang = sampleWithRequiredData;
        const khachHangCollection: IKhachHang[] = [
          {
            ...khachHang,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addKhachHangToCollectionIfMissing(khachHangCollection, khachHang);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a KhachHang to an array that doesn't contain it", () => {
        const khachHang: IKhachHang = sampleWithRequiredData;
        const khachHangCollection: IKhachHang[] = [sampleWithPartialData];
        expectedResult = service.addKhachHangToCollectionIfMissing(khachHangCollection, khachHang);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(khachHang);
      });

      it('should add only unique KhachHang to an array', () => {
        const khachHangArray: IKhachHang[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const khachHangCollection: IKhachHang[] = [sampleWithRequiredData];
        expectedResult = service.addKhachHangToCollectionIfMissing(khachHangCollection, ...khachHangArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const khachHang: IKhachHang = sampleWithRequiredData;
        const khachHang2: IKhachHang = sampleWithPartialData;
        expectedResult = service.addKhachHangToCollectionIfMissing([], khachHang, khachHang2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(khachHang);
        expect(expectedResult).toContain(khachHang2);
      });

      it('should accept null and undefined values', () => {
        const khachHang: IKhachHang = sampleWithRequiredData;
        expectedResult = service.addKhachHangToCollectionIfMissing([], null, khachHang, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(khachHang);
      });

      it('should return initial array if no KhachHang is added', () => {
        const khachHangCollection: IKhachHang[] = [sampleWithRequiredData];
        expectedResult = service.addKhachHangToCollectionIfMissing(khachHangCollection, undefined, null);
        expect(expectedResult).toEqual(khachHangCollection);
      });
    });

    describe('compareKhachHang', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareKhachHang(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareKhachHang(entity1, entity2);
        const compareResult2 = service.compareKhachHang(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareKhachHang(entity1, entity2);
        const compareResult2 = service.compareKhachHang(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareKhachHang(entity1, entity2);
        const compareResult2 = service.compareKhachHang(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
