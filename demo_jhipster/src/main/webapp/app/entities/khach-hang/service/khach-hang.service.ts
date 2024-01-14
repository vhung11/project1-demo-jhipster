import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IKhachHang, NewKhachHang } from '../khach-hang.model';

export type PartialUpdateKhachHang = Partial<IKhachHang> & Pick<IKhachHang, 'id'>;

export type EntityResponseType = HttpResponse<IKhachHang>;
export type EntityArrayResponseType = HttpResponse<IKhachHang[]>;

@Injectable({ providedIn: 'root' })
export class KhachHangService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/khach-hangs');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(khachHang: NewKhachHang): Observable<EntityResponseType> {
    return this.http.post<IKhachHang>(this.resourceUrl, khachHang, { observe: 'response' });
  }

  update(khachHang: IKhachHang): Observable<EntityResponseType> {
    return this.http.put<IKhachHang>(`${this.resourceUrl}/${this.getKhachHangIdentifier(khachHang)}`, khachHang, { observe: 'response' });
  }

  partialUpdate(khachHang: PartialUpdateKhachHang): Observable<EntityResponseType> {
    return this.http.patch<IKhachHang>(`${this.resourceUrl}/${this.getKhachHangIdentifier(khachHang)}`, khachHang, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKhachHang>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKhachHang[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getKhachHangIdentifier(khachHang: Pick<IKhachHang, 'id'>): number {
    return khachHang.id;
  }

  compareKhachHang(o1: Pick<IKhachHang, 'id'> | null, o2: Pick<IKhachHang, 'id'> | null): boolean {
    return o1 && o2 ? this.getKhachHangIdentifier(o1) === this.getKhachHangIdentifier(o2) : o1 === o2;
  }

  addKhachHangToCollectionIfMissing<Type extends Pick<IKhachHang, 'id'>>(
    khachHangCollection: Type[],
    ...khachHangsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const khachHangs: Type[] = khachHangsToCheck.filter(isPresent);
    if (khachHangs.length > 0) {
      const khachHangCollectionIdentifiers = khachHangCollection.map(khachHangItem => this.getKhachHangIdentifier(khachHangItem)!);
      const khachHangsToAdd = khachHangs.filter(khachHangItem => {
        const khachHangIdentifier = this.getKhachHangIdentifier(khachHangItem);
        if (khachHangCollectionIdentifiers.includes(khachHangIdentifier)) {
          return false;
        }
        khachHangCollectionIdentifiers.push(khachHangIdentifier);
        return true;
      });
      return [...khachHangsToAdd, ...khachHangCollection];
    }
    return khachHangCollection;
  }
}
