import { LocationStrategy } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterUnitsService } from 'src/app/services/filter-units.service';
import { UnitsService } from 'src/app/services/units.service';
import { Location } from 'src/app/types/location.interface';
import {UnitsResponse} from 'src/app/types/units-response.interface'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  //criar o output para mandar o evento para o app e pegar em outro component.
  @Output() submitEvent = new EventEmitter();
  results : Location[]  = []
  filteredResults : Location[]  = [];
  formGroup! : FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private unitService : UnitsService,
    private filterUnitsService: FilterUnitsService

    ){}


    ngOnInit(): void {
      this.formGroup = this.formBuilder.group({
        hour: '',
        showClosed: true
      })
      this.unitService.getAllUnits().subscribe(data => {
        this.results = data;
        this.filteredResults = data;
      });
    }

    onSubmit(): void {
      let { showClosed, hour } = this.formGroup.value
      this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour);
      this.unitService.setFilteredUnits(this.filteredResults);

      this.submitEvent.emit();
    }

    onClean(): void {
      this.formGroup.reset();
    }


}
