import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './donor-home.component.html',
  styleUrl: './donor-home.component.css'
})
export class DonorHomeComponent implements OnInit{
  httpClient = inject(HttpClient);
  data:any = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.httpClient.get('https://jsonplaceholder.typicode.com/posts').subscribe((data) => {
      console.log(data);
      this.data = data;
    })
  }
}
