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
  name:string | null='';
  email:string | null='';
  messageSent: boolean = false;
  constructor(private _http: HttpClient, private service:AuthService){}
  ngOnInit(): void {
    this.userId=this.service.getUserIdFromToken();
    this.getDonorData();
  }
sendMessage(body:any) {
  return this._http.post('http://localhost:3000/formulario', body);
  }
  getDonorData(): void {
  
    this._http.get(`http://localhost:3000/donors/list/${this.userId}/api`).subscribe((response:any) => {
      console.log(response);
     this.name=response.donor.name;
     this.email=response.donor.email;
    })
  }
  contactForm(form: any) {
    console.log(this.email);
    const formData = {
      name: this.name,
      email: this.email,
      asunto: form.value.asunto,
      message: form.value.message

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

