import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [],
  templateUrl: './teste.component.html',
  styleUrl: './teste.component.css'
})
export class TesteComponent implements OnInit {
  userId: string | null = null;
  userData: any = null;
  constructor(private authService: AuthService, private http: HttpClient) { }
  ngOnInit(): void {
  this.userId = this.authService.getUserIdFromToken();
  console.log('User ID:', this.userId);
  
  if (this.userId) {
    this.loadUserData(this.userId);
  }

}
  loadUserData(userId: string): void {
    
     this.http.get(`http://localhost:3000/donors/list/${userId}/api`).subscribe(user => {
       this.userData = user;
     });
  }
}

  


