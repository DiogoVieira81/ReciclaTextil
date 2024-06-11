import { Component, OnInit } from '@angular/core';
import { Donation } from '../../models/donation';
import { RestService } from '../rest.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { Entity } from '../../models/entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entity-detailed-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './entity-detailed-view.component.html',
  styleUrl: './entity-detailed-view.component.css',
})
export class EntityDetailedViewComponent implements OnInit {
  data: any;
  donorNames: any = [];
  conditionCounter: number[] = [0, 0, 0];
  totalKg : number = 0;
  totalItems: number = 0;
  totalPoints: number = 0;
  avgKg: number = 0;
  avgItems: number = 0;
  avgPoints: number = 0;

  constructor(
    private rest: RestService,
    private http: HttpClient,
    private authService: AuthService,
  ) {}
  entityID: any;
  entityData: any;

  ngOnInit(): void {
    this.entityID = this.authService.getUserIdFromToken();
    console.log('Entity ID:', this.entityID);
    this.loadEntityData(this.entityID!);
  }

  logout(): void {
    alert('Sessão terminada');
    this.authService.loggout();
  }

  loadEntityData(entityID: string): void {
    this.http
      .get(`http://localhost:3000/entities/list/${entityID}/api`)
      .subscribe((entity) => {
        this.entityData = entity;
      });
  }

  getDonations() {
    this.rest.getDonations().subscribe((data) => {
      console.log(data);
      this.data = data;

      if (this.data != null) {
        this.data.forEach((data:any) => {
            let i = this.donorNames.indexOf(data.donor);
            if (i === -1) {
              this.donorNames.push(data.donor.name);
            } else {
              this.donorNames[i]++;
            }

            if (data.condition === 'nova') {
              this.conditionCounter[0] += data.kg;
            } else if (data.condition === 'semi-nova') {
              this.conditionCounter[1] += data.kg;
            } else {
              this.conditionCounter[2] += data.kg;
            }

            this.totalKg += data.kg;
            this.totalItems += data.numberOfParts;
            this.totalPoints += data.points;
        });
        this.avgKg = this.totalKg / data.length;
        this.avgItems = this.totalItems / data.length;
        this.avgPoints = this.totalPoints / data.length;
      }
    });
  }
}
