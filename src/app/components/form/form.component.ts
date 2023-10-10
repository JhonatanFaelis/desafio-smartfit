import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnitsService } from 'src/app/services/units.service';
import { Location } from 'src/app/types/location.interface';
import {UnitsResponse} from 'src/app/types/units-response.interface'

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

  onClear(): void{
    this.formGroup.reset();
  }

  onSubmit(): void{
    if (!this.formGroup.value.showClosed) {
      this.filterResults = this.results.filter(location => location.opened === true)
    }
    else{
      this.filterResults = this.results;
    }
  }

}
