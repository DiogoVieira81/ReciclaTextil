import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RestService } from '../rest.service';
import { Donation } from '../../models/donation';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-donation-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './donation-list.component.html',
  styleUrl: './donation-list.component.css'
})
export class DonationListComponent implements OnInit{
  httpClient = inject(HttpClient);
  data:Donation[] = [];

  constructor(private rest : RestService, private authService : AuthService){}

  ngOnInit(): void {
    this.getDonations();
  }

  logout(): void {
    alert('Sessão terminada');
    this.authService.loggout();
  }

  getDonations() {
    this.rest.getDonations().subscribe((data) => {
      console.log(data);
      this.data = data;
    })
  }
}
