import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(private http: HttpClient) {}

  getEntityKPIs(): Observable<any> {
    return this.http.get('/api/entity/kpis');
  }

  getPointsOverTime(): Observable<any> {
    return this.http.get('/api/entity/points-over-time');
  }
}
