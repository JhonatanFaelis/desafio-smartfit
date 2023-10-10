import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnitsService } from 'src/app/services/units.service';
import { Location } from 'src/app/types/location.interface';
import {UnitsResponse} from 'src/app/types/units-response.interface'


const HOURS = {
  morning: {
    first: '06',
    last:'12'
  } ,
  after :{
    first: '12',
    last:'18'
  },
  night : {
    first: '18',
    last:'23'
  }

}

type HOUR_INDEX = 'morning' | 'after' | 'night';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  results : Location[] = [];
  filterResults : Location[]  = [];
  formGroup! : FormGroup;

  constructor( 
    private formBuilder : FormBuilder,
    private unitService : UnitsService
    
    ){}


  ngOnInit():void{
    
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false
    })
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data.locations;
      this.filterResults = data.locations;
    })
  }

  filterUnits(unit:Location, open_hour:string, close_hour:string){
    debugger
    if(!unit.schedules) return true;
    let open_hour_filter = parseInt(open_hour,10);
    let close_hour_hour_filter = parseInt(close_hour,10);

    let today_weekday = this.transformWeekDay(new Date().getDay());

    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour;
      let schedule_weekday = unit.schedules[i].weekdays;

      if (today_weekday == schedule_weekday) {
        if (schedule_hour != 'Fechada') {
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' ás ');
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10) 
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10)

          if(unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_hour_filter) return true
          else return false
        } 
      }   
    }
    return false;
  }

  onClear(): void{
    this.formGroup.reset();
  }

  onSubmit(): void{
    debugger
    let intermediateResults = this.results;
    if (!this.formGroup.value.showClosed) {
      intermediateResults = this.results.filter(location => location.opened == true)     
    }
   
    if (this.formGroup.value.hour) {
      const OPEN_HOUR = HOURS[this.formGroup.value.hour as HOUR_INDEX].first
      const CLOSE_HOUR = HOURS[this.formGroup.value.hour as HOUR_INDEX].last
      this.filterResults = intermediateResults.filter(location => this.filterUnits(location,OPEN_HOUR,CLOSE_HOUR))
    }
    else{
      this.filterResults = intermediateResults;
    }
  

    
  }


  transformWeekDay(weekday : number){
    switch (weekday) {
      case 0:
        return 'Dom.'
        break;
        case 6:
        return 'Sab.'
        break;
      default:
        return 'Seg. a Sex.'
        break;
    }
  }



}
