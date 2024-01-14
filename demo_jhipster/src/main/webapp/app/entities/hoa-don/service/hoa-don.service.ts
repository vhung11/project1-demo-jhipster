import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHoaDon, NewHoaDon } from '../hoa-don.model';

export type PartialUpdateHoaDon = Partial<IHoaDon> & Pick<IHoaDon, 'id'>;

type RestOf<T extends IHoaDon | NewHoaDon> = Omit<T, 'ngayMua'> & {
  ngayMua?: string | null;
};

export type RestHoaDon = RestOf<IHoaDon>;

export type NewRestHoaDon = RestOf<NewHoaDon>;

export type PartialUpdateRestHoaDon = RestOf<PartialUpdateHoaDon>;

export type EntityResponseType = HttpResponse<IHoaDon>;
export type EntityArrayResponseType = HttpResponse<IHoaDon[]>;

@Injectable({ providedIn: 'root' })
export class HoaDonService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/hoa-dons');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(hoaDon: NewHoaDon): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(hoaDon);
    return this.http
      .post<RestHoaDon>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(hoaDon: IHoaDon): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(hoaDon);
    return this.http
      .put<RestHoaDon>(`${this.resourceUrl}/${this.getHoaDonIdentifier(hoaDon)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(hoaDon: PartialUpdateHoaDon): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(hoaDon);
    return this.http
      .patch<RestHoaDon>(`${this.resourceUrl}/${this.getHoaDonIdentifier(hoaDon)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestHoaDon>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestHoaDon[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getHoaDonIdentifier(hoaDon: Pick<IHoaDon, 'id'>): number {
    return hoaDon.id;
  }

  compareHoaDon(o1: Pick<IHoaDon, 'id'> | null, o2: Pick<IHoaDon, 'id'> | null): boolean {
    return o1 && o2 ? this.getHoaDonIdentifier(o1) === this.getHoaDonIdentifier(o2) : o1 === o2;
  }

  addHoaDonToCollectionIfMissing<Type extends Pick<IHoaDon, 'id'>>(
    hoaDonCollection: Type[],
    ...hoaDonsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const hoaDons: Type[] = hoaDonsToCheck.filter(isPresent);
    if (hoaDons.length > 0) {
      const hoaDonCollectionIdentifiers = hoaDonCollection.map(hoaDonItem => this.getHoaDonIdentifier(hoaDonItem)!);
      const hoaDonsToAdd = hoaDons.filter(hoaDonItem => {
        const hoaDonIdentifier = this.getHoaDonIdentifier(hoaDonItem);
        if (hoaDonCollectionIdentifiers.includes(hoaDonIdentifier)) {
          return false;
        }
        hoaDonCollectionIdentifiers.push(hoaDonIdentifier);
        return true;
      });
      return [...hoaDonsToAdd, ...hoaDonCollection];
    }
    return hoaDonCollection;
  }

  protected convertDateFromClient<T extends IHoaDon | NewHoaDon | PartialUpdateHoaDon>(hoaDon: T): RestOf<T> {
    return {
      ...hoaDon,
      ngayMua: hoaDon.ngayMua?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restHoaDon: RestHoaDon): IHoaDon {
    return {
      ...restHoaDon,
      ngayMua: restHoaDon.ngayMua ? dayjs(restHoaDon.ngayMua) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestHoaDon>): HttpResponse<IHoaDon> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestHoaDon[]>): HttpResponse<IHoaDon[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
