import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { NgModel } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
NgModel

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userId: string | null = null;
  userData: any = null;
  ;
  constructor(private authService: AuthService, private http:HttpClient) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken();
    console.log('User ID:', this.userId);
    
  }
  /* exemplo com a requisicao para ir buscar a entidade que queres-> no useriD ao fazer login ja fica armazenado o _id 
  loadUserData(userId: string): void {
    
    this.http.get(`http://localhost:3000/donors/list/${userId}/api`).subscribe(user => {
      this.userData = user;
    
    })
  }*/
}
