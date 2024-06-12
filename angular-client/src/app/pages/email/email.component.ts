import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule,RouterModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})

export class EmailComponent implements OnInit{
  userId: string | null = null;
  userType :string | null = null;
  name:string | null = null;
  email:string | null='';
  assunto:string | null='';
  messageSent: boolean = false;
  message: string | null = '';
  constructor(private _http: HttpClient, private service:AuthService){}
  ngOnInit(): void {
    this.userId=this.service.getUserIdFromToken();
    this.getDonorData();
  }
sendMessage(body:any) {
  return this._http.post('http://localhost:3000/formulario', body);
  }
  getDonorData(): void {
    
    this._http.get(`http://localhost:3000/donors/list/${this.userId}/api`).subscribe((donorResponse: any) => {
      console.log(donorResponse);
   
      if (donorResponse != null && donorResponse.donor != null && donorResponse.donor.name) {
        this.name = donorResponse.donor.name;
        this.email = donorResponse.donor.email;
        this.userType = 'donor'
      } else {
        this._http.get(`http://localhost:3000/entities/list/${this.userId}/api`).subscribe((entityResponse: any) => {
          console.log(entityResponse);
            this.name = entityResponse.entity.name;
            this.email = entityResponse.entity.email;
            this.userType = 'entity';
          
        });
      }
    });
  }
  
  contactForm(form: any) {
    console.log(this.email);
    const formData = {
      name: this.name,
      email: this.email,
      asunto: this.assunto,
      message: this.message

    };
    this.sendMessage(formData).subscribe(() => {
      this.messageSent = true;
      form.controls['asunto'].reset();
      form.controls['message'].reset();
    });
  }
  logout(): void {
    alert('Sessão terminada');
    this.service.loggout();
  }
}

