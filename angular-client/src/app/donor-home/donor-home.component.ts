import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class DonorHomeComponent implements OnInit{
  httpClient = inject(HttpClient);
  data:any = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.httpClient.get('http://localhost:3000/admins/list/api').subscribe((data) => {
      console.log(data);
      this.data = data;
    })
  }
}
