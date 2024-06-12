import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { RestService } from '../rest.service';
import { ChangePointsDonorComponent } from '../change-points-donor/change-points-donor.component';
import { AuthService } from '../../../../../angular-client/src/app/auth.service';
import { Router } from '@angular/router';
import { Donation } from '../../models/donation';

@Component({
  selector: 'angular-client',
  standalone: true,
  imports: [HttpClientModule, FormsModule, NgForOf],
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class DonationFormComponent implements OnInit {
  donation: Donation = {
    numberOfParts: 0,
    condition: ' ',
    kg: 0,
    points: 0,
    state: ' ',
    donor: ' ',
    entity: ' ',
  };
  donors: any; // Array to hold donor data
  entities: any[] = []; // Array to hold entity data
  entityData: any;
  donorData: any;
  entityID: string | null = ' ';
  donorID: string | null = ' ';
  donations: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private rest: RestService,
    private points: ChangePointsDonorComponent,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getDonations();
    this.entities;
    this.donorID = this.authService.getUserIdFromToken();
  }

  logout(): void {
    alert('Sessão terminada');
    this.authService.loggout();
  }

  calculatePoints(): any {
      if (this.donation.kg && this.donation.condition) {
          if (this.donation.condition === 'nova') {
              this.donation.points = this.donation.kg * 9;
          } else if (this.donation.condition === 'semi-nova') {
            this.donation.points = this.donation.kg * 5;
          } else if (this.donation.condition === 'desgastada') {
            this.donation.points = this.donation.kg * 2;
          }
      }
  }

  getDonations() {
    this.rest.getDonations().subscribe((data) => {
      console.log(data);
      this.donations = data;
    });
  }

  getEntities(){
    this.rest.getEntities().subscribe((data) => {
      console.log(data);
      this.entities = data;
    });
  }

  onSubmit(): void {
    this.rest.createDonation(this.donation).subscribe((donation: any) => {
      this.donation.donor = this.donorID;
      this.donations.push(this.donation);
      console.log('Donation sent successfully:', donation);
      this.router.navigate(['/dashboard/donors']);
    });
  }

  /*onSubmit(): void {
    // Handle form submission
    const token = this.authService.getToken(); // Assuming getToken method returns the JWT token

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post('http://localhost:3000/donations/create', this.donation, { headers, responseType: 'text' }).subscribe({
      next: (response) => {
        if (response.startsWith('<!DOCTYPE html>')) {
          console.error('Received an HTML response instead of JSON. This likely indicates a login redirection or server error.');
        } else {
          try {
            const jsonResponse = JSON.parse(response);
            console.log('Donation submitted', jsonResponse);
          } catch (e) {
            console.error('Error parsing response as JSON:', response);
          }
        }
      },
      error: (error) => {
        console.error('Error submitting donation', error);
      }
    });
  }*/
}
