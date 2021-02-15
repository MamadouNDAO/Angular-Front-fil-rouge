import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  apiHost: string = environment.apiHost;
  constructor(private httpClient: HttpClient) { }

  checkGrpComp(): Observable<any> {
    return this.httpClient.get<any>(this.apiHost + 'admin/groupe_competences/competences?isDeleted=false');
  }

  postComp(data: any): Observable<any>{
    return this.httpClient.post<any>(this.apiHost + 'admin/competences', data);
  }
}
