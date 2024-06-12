import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { RestService } from '../rest.service';
import { ChangePointsDonorComponent } from '../change-points-donor/change-points-donor.component';
import { AuthService } from '../../../../../angular-client/src/app/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'angular-client',
  standalone: true,
  imports: [HttpClientModule, FormsModule, NgForOf, RouterModule],
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class DonationFormComponent implements OnInit {
  donation = {
    numberOfParts: '',
    condition: '',
    kg: 0,
    donor: '',
    entity: '',
    points: 0
  };
  entities: any[] = []; // Array to hold entity data
  entityData: any;
  donorData: any;
  entityID: string | null = ' ';
  donorID: string | null = ' ';

  constructor(private http: HttpClient, private rest: RestService, private points: ChangePointsDonorComponent, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadEntities();

  }

  loadEntities(): void {
    // Fetch entities from the backend API
    this.rest.getEntities().subscribe(
      (data: any[]) => {
        this.entities = data;
      },
      (error: any) => {
        console.error('Error fetching entities', error);
      }
    );
  }

  setDonor(): void {
    const donorId = this.authService.getUserIdFromToken();  // Assuming getUserId method returns the logged-in user's ID
    if (donorId) {
      this.donation.donor = donorId;
    } else {
      console.error('Donor ID is not set');
    }
  }

  calculatePoints(): any {
    return this.points.getDonorPoints();
  }

  onSubmit(): void {
    this.setDonor();
    // Ensure donor ID is set before submitting
    if (!this.donation.donor) {
      console.error('Donor ID is not set');
      return;
    }
    // Handle form submission
    const token = this.authService.getToken(); // Assuming getToken method returns the JWT token

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log('Submitting donation:', this.donation);

    this.http.post('http://localhost:3000/donations/create/api', this.donation, { headers, responseType: 'text' }).subscribe({
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
  }
}
