import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
CommonModule
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:string='';
  password:string='';
  errorMessage: string | null = null;
  
  constructor(private authService: AuthService,private router:Router){}

  login(event: Event) {
    event.preventDefault();
    this.errorMessage = null; 
    console.log(`login ${this.email}`)
    this.authService.login({ email: this.email, password: this.password })
    .subscribe(()=>{
      alert("login sucesso");
      this.router.navigate(['/dashboard']);
    },
     (error: HttpErrorResponse) => {
        if (error.status === 400) {
          alert ("Usuário ou senha incorretos");
        } else {
          alert("Ocorreu um erro. Por favor, tente novamente");
        }
      }
    )};

  }
    
  

