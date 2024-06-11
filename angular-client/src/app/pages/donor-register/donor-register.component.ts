import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { Donor } from '../../models/donor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-donor-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './donor-register.component.html',
  styleUrl: './donor-register.component.css',
})
export class DonorRegisterComponent {
  donors: any;
  donor: any = {
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    city: '',
    district: '',
    kg: 0,
    points: 0,
    totalDonations: 0,
    ImageName: '',
  };

  constructor(
    private httpClient: HttpClient,
    private rest: RestService,
    private router: Router
  ) {}

  getDonors(): void {
    this.rest.getDonors().subscribe((data: any[]) => {
      this.donors = data;
    });
  }

  onSubmit(): void {
    this.rest.createDonor(this.donor).subscribe((donor: any) => {
      this.donor.kg = 0;
      this.donor.points = 0;
      this.donor.totalDonations = 0;
      this.donor.ImageName = 'teste';
      this.donors.push(this.donor);
      console.log('Donor saved successfully:', donor);
      this.router.navigate(['/login']);
    });
  }
}
