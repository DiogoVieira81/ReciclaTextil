import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  constructor(private httpClient: HttpClient) {}

  getDonations(): Observable<any[]> {
    return this.httpClient.get<any[]>('http://localhost:3000/donations/list/api').pipe(
      map((response: any) => response.donations)
    );
  }
}
