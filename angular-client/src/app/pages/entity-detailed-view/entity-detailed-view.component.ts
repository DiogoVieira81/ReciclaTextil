import { Component, OnInit } from '@angular/core';
import { Donation } from '../../models/donation';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-entity-detailed-view',
  standalone: true,
  imports: [],
  templateUrl: './entity-detailed-view.component.html',
  styleUrl: './entity-detailed-view.component.css'
})
export class EntityDetailedViewComponent implements OnInit{
  data: Donation[] = [];
  donorNames : any = [];
  conditionCounter : number[] = [0, 0, 0];
  avgKg : number = 0;
  avgItems : number = 0;
  avgPoints : number = 0;

  constructor(private rest : RestService){}

  ngOnInit(): void {
    this.getDonations();
  }

  getDonations() {
    this.rest.getDonations().subscribe((data) => {
      console.log(data);
      this.data = data;

      if (this.data != null) {
        this.data.forEach((data) => {
          let i = this.donorNames.indexOf(data.donor.name);
          if (i === -1) {
            this.donorNames.push(data.donor.name);
          } else {
            this.donorNames[i]++;
          }

          if(data.condition == "nova"){
            this.conditionCounter[0] += data.kg;
          }else if(data.condition == "semi-nova"){
            this.conditionCounter[1] += data.kg;
          }else{
            this.conditionCounter[2] += data.kg;
          }

          this.avgKg += data.kg;
          this.avgItems += data.numberOfParts;
          this.avgPoints += data.points;
        });
        this.avgKg = this.avgKg/data.length;
        this.avgItems = this.avgItems/data.length;
        this.avgPoints = this.avgPoints/data.length;
      }
    });
  }
}
