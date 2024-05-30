import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Entity } from '../models/entity';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  httpClient = inject(HttpClient);

  public donationListURL = 'http://localhost:3000/donations/list/api';

  public entityListURL = 'http://localhost:3000/entities/list/api';
  public entityCreateURL = 'http://localhost:3000/entities/create';

  getDonations(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.donationListURL).pipe(
      map((response: any) => response.donations)
    );
  }

  getEntities(): Observable<Entity[]> {
    return this.httpClient.get<Entity[]>(this.entityListURL).pipe(
      map((response: any) => response.entities)
    );
  }

  createEntity(entity: Entity): Observable<Entity> {
    return this.httpClient.post<Entity>(this.entityCreateURL, entity)
    .pipe(
      catchError((error: HttpResponse<any>) => {
        if (error.status >= 200 && error.status < 300) {
          return EMPTY;
        } else {
          console.error('Error saving entity:', error);
          alert('Failed to save entity.');
          return throwError(error);
        }
      })
    );
  }
}
