import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { AuthService } from '../../auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-donor',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-donor.component.html',
  styleUrl: './profile-donor.component.css',
})
export class ProfileDonorComponent implements OnInit {
  donors: any[] = [];
  donorID : string | null = "";
  donor : any;

  constructor(private rest: RestService, private authService : AuthService) {}

  ngOnInit(): void {
    this.donorID = this.authService.getUserIdFromToken();
    console.log(this.donorID);
    this.getDonors();
    this.getDonor();
    console.log(this.donor);
  }

  logout(): void {
    alert('Sessão terminada');
    this.authService.loggout();
  }

  getDonors() {
    this.rest.getDonors().subscribe((data) => {
      console.log(data);
      this.donors = data;
    });
  }

  getDonor(){
    this.donors.forEach((data:any) => {
      if(this.donorID === data._id){
        this.donor = data;
      }
    });
  }
}
