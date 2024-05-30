import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  httpClient = inject(HttpClient);

  public donationListURL = 'http://localhost:3000/donations/list/api';

  public entityListURL = 'http://localhost:3000/entities/create/api';
  public entityCreateURL = 'http://localhost:3000/entities/create/api';

  getDonations(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.donationListURL).pipe(
      map((response: any) => response.donations)
    );
  }

  getEntities(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.entityListURL).pipe(
      map((response: any) => response.entities)
    );
  }

  createEntity(entity: any): Observable<any> {
    return this.httpClient.post<any>(this.entityCreateURL, entity);
  }
}
