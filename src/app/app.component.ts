import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from './types/location.interface';
import { UnitsService } from './services/units.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showList = new BehaviorSubject(false);
  unitsList : Location [] = []

  constructor( private unitService: UnitsService){}

  onSubmit(){
    this.showList.next(true);
    this.unitsList = this.unitService.getFilteredUnits();
  }
}
