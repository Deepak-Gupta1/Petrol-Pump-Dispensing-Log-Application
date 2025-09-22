import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  DispensingRecordDto, IResponseModel } from '../Model/projectModel';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DispensingService {

  private apiUrl = `${environment.apiEndPoint}/Dispensing`;

  constructor(private http: HttpClient) { }

  submitRecord(payload: any): Observable<IResponseModel<boolean>> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<IResponseModel<boolean>>(`${this.apiUrl}/SaveRecord`, payload, { headers });
  }

  getRecords(filter: {
    dispenserNo?: string;
    paymentMode?: string;
    startDate?: string;
    endDate?: string;
  }): Observable<IResponseModel<DispensingRecordDto[]>> {
    let params = new HttpParams();

    if (filter.dispenserNo) {
      params = params.set('dispenserNo', filter.dispenserNo);
    }
    if (filter.paymentMode) {
      params = params.set('paymentMode', filter.paymentMode);
    }
    if (filter.startDate) {
      params = params.set('startDate', filter.startDate);
    }
    if (filter.endDate) {
      params = params.set('endDate', filter.endDate);
    }
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<IResponseModel<DispensingRecordDto[]>>(`${this.apiUrl}/GetDispensingRecords`, { headers, params });
  }


}
