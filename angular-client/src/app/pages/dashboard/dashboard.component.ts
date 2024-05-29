import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api-service.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone:true,
  imports:[CommonModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  donors: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
   this.getUsers();
  }

  private getUsers(): void {
    this.apiService.getDonors().subscribe(
      (data: any) => {
        if (data && data.donors) { // Verifica se 'data' e 'data.donors' existem
          this.donors = data.donors; // Atribui 'data.donors' à variável 'users'
        } else {
          console.error('Invalid response format:', data);
        }
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }
}
