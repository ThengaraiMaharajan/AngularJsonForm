import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dynamic-forms-i',
  templateUrl: './dynamic-forms-i.component.html',
  styleUrls: ['./dynamic-forms-i.component.css']
})
export class DynamicFormsIComponent implements OnInit {

  constructor() { }

  dynamicJsonForm : any;
  form!: FormGroup;
  fields: any = []

  ngOnInit(): void {}

}
