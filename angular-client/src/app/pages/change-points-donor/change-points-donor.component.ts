import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-points-donor',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './change-points-donor.component.html',
  styleUrl: './change-points-donor.component.css'
})
export class ChangePointsDonorComponent implements OnInit{
  donorsTickets:any=null;
  trocarClicado: boolean = false;
  ticketUpdateMessage: string = '';
  class='';
  userId: string | null = null;
  points: any = null;
  ticket:number=0;
  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    console.log('User ID:', this.userId);
    this.getDonorPoints();
  }

  logout(): void {
    alert("Sessão terminada");
    this.authService.loggout();
    
  }
  

  updateDonorTicket(): void {
    const body = { ticket: this.ticket, points: this.points - (this.ticket * 5) };
    this.http.post(`http://localhost:3000/donors/ticket/${this.userId}/api`, body).subscribe((response: any) => {
      console.log(response);
      if(this.ticket>0){
        this.class="alert alert-info";
      this.ticketUpdateMessage=`Parabens!Obteve ${this.ticket} tickets!`;
      this.getDonorPoints(); 
      }else{
        this.class="alert alert-danger"
        this.ticketUpdateMessage=`São necessários no mínimo 5 pontos para obter um vale!`;
        
    }
    });
  }



  getDonorPoints(): void {
  
      this.http.get(`http://localhost:3000/donors/list/${this.userId}/api`).subscribe((response:any) => {
        console.log(response);
        this.points=response.donor.points
        this.donorsTickets=response.donor.ticket
        this.getTicketsDonor();
      })
    }

    getTicketsDonor():void{
          this.ticket = Math.floor(this.points / 5);
    }
    
trocar(): void {
  this.trocarClicado = true; 
  this.updateDonorTicket(); 
}
    
}


