import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'angular-client',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
  donors : any[] = []; // Array to hold donor data
  entities : any[] = []; // Array to hold entity data

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDonors();
    this.loadEntities();
  }

  loadDonors(): void {
    // Fetch donors from the backend API
    this.http.get<any[]>('/api/donors').subscribe(data => {
      this.donors = data;
    }, error => {
      console.error('Error fetching donors', error);
    });
  }

  loadEntities(): void {
    // Fetch entities from the backend API
    this.http.get<any[]>('/api/entities').subscribe(data => {
      this.entities = data;
    }, error => {
      console.error('Error fetching entities', error);
    });
  }

  calculatePoints(): void {
    const { kg, condition } = this.donation;
    this.http.post<any>('/donations/create', { kg, condition }).subscribe(response => {
      this.donation.points = response.points;
    }, error => {
      console.error('Error calculating points', error);
    });
  }

  onSubmit(): void {
    // Handle form submission
    this.http.post('/donations/create', this.donation).subscribe(response => {
      console.log('Donation submitted', response);
    }, error => {
      console.error('Error submitting donation', error);
    });
  }
}
