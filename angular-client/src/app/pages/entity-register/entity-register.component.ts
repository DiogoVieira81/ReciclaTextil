import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Entity } from '../../models/entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entity-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './entity-register.component.html',
  styleUrl: './entity-register.component.css',
})
export class EntityRegisterComponent {
  entities: any[] = [];
  entity: Entity = {
    name: '',
    taxpayerNumber: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    city: '',
    district: '',
    description: '',
    kg: 0,
    totalDonations: 0,
    ImageName: '',
  };

  constructor(private httpClient: HttpClient, private rest: RestService, private router : Router) {}

  getEntities(): void {
    this.rest.getEntities().subscribe((data: any[]) => {
      this.entities = data;
    });
  }

  onSubmit(): void {
    this.rest.createEntity(this.entity).subscribe((entity: any) => {
      this.entities.push(this.entity);
      console.log('Entity saved successfully:', entity);
      this.entity = {
        name: '',
        taxpayerNumber: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
        city: '',
        district: '',
        description: '',
        kg: 0,
        totalDonations: 0,
        ImageName: '',
      };
      this.router.navigate([`/dashboard/${entity.email}`]);
    });
  }
}
