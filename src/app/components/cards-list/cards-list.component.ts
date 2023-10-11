import { Component, Input, OnInit } from '@angular/core';
import { UnitsService } from 'src/app/services/units.service';
import { Location } from 'src/app/types/location.interface';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit{
  @Input() unitsList: Location [] = [];


  constructor(private unitService : UnitsService){}

  ngOnInit(): void {
    this.unitsList = this.unitService.getFilteredUnits();
    console.log(this.unitsList);
  }

}
