import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-donation-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './donation-list.component.html',
  styleUrl: './donation-list.component.css'
})
export class DonationListComponent implements OnInit{
  httpClient = inject(HttpClient);
  data:any = [];

  ngOnInit(): void {
    this.getDonations();
  }

  fetchData(){
    this.httpClient.get('http://localhost:3000/donations/list/api').subscribe((data) => {
      console.log(data);
      this.data = data;
    })
  }

  getDonations() {
    this.httpClient.get<any[]>('http://localhost:3000/donations/list/api').pipe(
      map((response: any) => response.donations)
    ).subscribe((data) => {
      console.log(data);
      this.data = data;
    })
  }
}
