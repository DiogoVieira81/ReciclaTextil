import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { RestService } from '../rest.service';
import { Donation } from '../../models/donation';
import { AuthService } from '../../auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-donation-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule],
  templateUrl: './donation-list.component.html',
  styleUrl: './donation-list.component.css',
})
export class DonationListComponent implements OnInit {
  httpClient = inject(HttpClient);
  data: any[] = [ ];
  entityID : String | null = "";

  constructor(private rest: RestService, private authService: AuthService) {}

  ngOnInit(): void {
    this.entityID = this.authService.getUserIdFromToken();
    console.log('Entity ID:', this.entityID);
    this.getDonations();
  }

  logout(): void {
    alert('Sessão terminada');
    this.authService.loggout();
  }

  getDonations() {
    this.rest.getDonations().subscribe((data) => {
      console.log(data);
      if (this.data != null) {
        this.data = data;
      }
    });
  }
}
