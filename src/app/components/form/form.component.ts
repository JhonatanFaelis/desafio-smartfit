import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnitsService } from 'src/app/services/units.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  results = [];
  formGroup! : FormGroup;

  constructor( 
    private formBuilder : FormBuilder,
    private unitService : UnitsService
    
    ){}


  ngOnInit():void{
    this.unitService.getAllUnits().subscribe(data => console.log(data))
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false
    })
  }

  onClear(): void{
    this.formGroup.reset();
  }

  onSubmit(): void{
    console.log(this.formGroup.value)
  }

}
