import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Entity } from '../models/entity';
import { Donor } from '../models/donor';
import { Donation } from '../models/donation';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  httpClient = inject(HttpClient);

  public donationListURL = 'http://localhost:3000/donations/list/api';
  public donorListURL = 'http://localhost:3000/donors/list/api';
  public entityListURL = 'http://localhost:3000/entities/list/api';

  public donationCreateURL = 'http://localhost:3000/donations/create/api'
  public entityCreateURL = 'http://localhost:3000/entities/create/api';
  public donorCreateURL = 'http://localhost:3000/donors/create/api';

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

  getDonors(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.donorListURL).pipe(
      map((response: any) => response.donors)
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
          return throwError(() => error);
        }
      })
    );
  }

  createDonor(donor: Donor): Observable<Donor> {
    return this.httpClient.post<Donor>(this.donorCreateURL, donor)
    .pipe(
      catchError((error: HttpResponse<any>) => {
        if (error.status >= 200 && error.status < 300) {
          return EMPTY;
        } else {
          console.error('Error saving donor:', error);
          alert('Failed to save donor.');
          return throwError(() => error);
        }
      })
    );
  }

  createDonation(donation: Donation): Observable<Donation> {
    return this.httpClient.post<Donation>(this.donationCreateURL, donation)
    .pipe(
      catchError((error: HttpResponse<any>) => {
        if (error.status >= 200 && error.status < 300) {
          return EMPTY;
        } else {
          console.error('Error saving donation:', donation);
          alert('Failed to save donation.');
          return throwError(() => error);
        }
      })
    );
  }
}
