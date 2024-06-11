import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, NO_ERRORS_SCHEMA} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { RestService } from '../rest.service';
import { ChangePointsDonorComponent } from '../change-points-donor/change-points-donor.component';

@Component({
  selector: 'angular-client',
  standalone: true,
  imports: [HttpClientModule, FormsModule, NgForOf],
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
  donors : any; // Array to hold donor data
  entities: any[] = []; // Array to hold entity data
  entityData: any;
  donorData: any;
  entityID: string | null = ' ';
  donorID: string | null = ' ';

  constructor(private http: HttpClient, private rest: RestService, private points: ChangePointsDonorComponent) {}

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

  calculatePoints(): void {
    this.points.getDonorPoints();
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
