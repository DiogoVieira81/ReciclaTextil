import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-entity-register',
  standalone: true,
  imports: [],
  templateUrl: './entity-register.component.html',
  styleUrl: './entity-register.component.css'
})
export class EntityRegisterComponent {
  entities : any[] = [];
  entity: any = {
    name: '',
    taxPayerNumber: '',
    email: '',
    phoneNumber: '',
    address : '',
    city : '',
    district : '',
    description : '',
    cover : ''
  };

  constructor(private httpClient : HttpClient, private rest : RestService){

  }

  getEntities(): void {
    this.rest.getEntities().subscribe((data: any[]) => {
      this.entities = data;
    });
  }

  createEntity(): void {
    this.rest.createEntity(this.entity).subscribe((donation: any) => {
      this.entities.push(this.entity);
      this.entity = {
        name: '',
        taxPayerNumber: '',
        email: '',
        phoneNumber: '',
        address : '',
        city : '',
        district : '',
        description : '',
        cover : ''
      };
    });
  }
}
