import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  results = [];
  formGroup! : FormGroup;

  constructor( private formBuilder : FormBuilder){}


  ngOnInit():void{
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
