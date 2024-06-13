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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgForOf } from '@angular/common';
import { RestService } from '../rest.service';
import { ChangePointsDonorComponent } from '../change-points-donor/change-points-donor.component';
import { AuthService } from '../../../../../angular-client/src/app/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Donation } from '../../models/donation';

@Component({
  selector: 'angular-client',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    NgForOf,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css'],
  schemas: [],
})
export class DonationFormComponent implements OnInit {
  donation: Donation = {
    id: this.generateId(),
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
  entityName: String | null = ' ';
  data: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private rest: RestService,
    private points: ChangePointsDonorComponent,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.donorID = this.authService.getUserIdFromToken();
    console.log(this.donorID);
    this.getDonations();
    this.getEntities();
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

  getEntities() {
    this.rest.getEntities().subscribe((data) => {
      console.log(data);
      this.entities = data;
    });
  }

  onSubmit(): void {
    console.log(this.donation.id);
    this.donation.donor = this.donorID;
    this.donation.state = 'Registada';
    console.log(this.entityName);
    this.rest.getEntities().subscribe((data) => {
      console.log(data);
      this.data = data;

      if (this.data != null) {
        this.data.forEach((data: any) => {
          if (data.name === this.entityName) {
            this.donation.entity = data._id;
          }
        });
      }
    });
    this.rest.createDonation(this.donation).subscribe((donation: any) => {
      console.log(this.donation);
      console.log(this.donations);
      this.donations.push(this.donation);
      console.log('Donation sent successfully:', donation);
      alert('Donation sent.');
      this.sendDonationNotification(this.donation);
      this.router.navigate(['/dashboard/donors']);
    });
  }

  generateId() {
    const length = Math.floor(Math.random() * 9) + 1;
    const id = 'D' + Math.random().toString(36).substr(2, length);
    return id;
  }
  private sendDonationNotification(donation: any): void {
    const emailData = {
        name: this.donation.donor,
        email: 'escolaEstg@sapo.pt', 
        asunto: 'Nova Doação Realizada',
        message: `Uma nova doação de ${donation.kg} quilos foi realizada pelo doador com id nª ${this.donorID}.`
    };

    this.http.post('http://localhost:3000/formulario', emailData).subscribe({
        next: (response) => {
            console.log('Email de notificação enviado com sucesso');
        },
        error: (error) => {
            console.error('Erro ao enviar email de notificação', error);
        }
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
