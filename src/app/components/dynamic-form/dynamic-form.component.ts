import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  constructor(private fb : FormBuilder) {}

  dynamicForm! : FormGroup; 
  dynamicJsonForm : any;
  minDate: string = '';

  ngOnInit(): void {
    this.dynamicForm = this.fb.group({})
    this.dynamicReactiveForm(); 
    // this.dateOperations();
    this.minDate = new Date().toISOString().split('T')[0]
  }

  get a (){return this.dynamicForm.controls}
  formSubmitted : boolean = false;

  dynamicReactiveForm(){
    this.dynamicJsonForm = {
      "controls" :
      [
        {
          "name": "firstName",
          "label": "First Name",
          "value":"",
          "type":"text",
          "placeholder":"Enter your Name",
          "validatorPresence": true,
          "validators":{
              "required": true,
              "minLength":3,
              "maxLength":50,
              "pattern": /^[a-zA-Z]{3,50}$/
          }
        },
        {
          "name": "dob",
          "label": "Date Of Birth",
          "value":'',
          "type":"date",
          "placeholder":"Enter Date of Birth",
          "validatorPresence": true,
          "minDate":"particularPast",
          "maxDate":"today",
          "particularPast":"5",
          "particularFuture":"5",
          "validators":{
              "required": true
          }
        },
        {
          "name": "futuredate",
          "label": "Future Date",
          "value":'',
          "type":"date",
          "placeholder":"Enter Date of Birth",
          "validatorPresence": true,
          "minDate":"today",
          "maxDate":"particularFuture",
          "particularPast":"5",
          "particularFuture":"5",
          "validators":{
              "required": true
          }
        },
        {
          "name": "age",
          "label": "Age",
          "value":"",
          "type":"number",
          "placeholder":"Enter your Age",
          "validatorPresence": true,
          "validators":{
              "required": true,
              "minLength":1,
              "maxLength":100,
              "min":18,
              "max":25
          }
        },
        {
          "name": "email",
          "label": "E-mail",
          "value":"",
          "type":"text",
          "placeholder":"Enter your Name",
          "validatorPresence": true,
          "validators":{
              "required": true,
              "minLength":3,
              "maxLength":50,
              "pattern": /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          }
        },
        {
          "name": "gender",
          "label": "Gender",
          "value":'',
          "options":[
                    {'valueLabel' : 'male','id':1},
                    {'valueLabel' : 'female','id':2},
                    {'valueLabel' : 'Not Willing to mention','id':3},
                  ],
          "type":"radio",
          "placeholder":"",
          "validatorPresence": true,
          "validators":{
          "required": true,
          }
        },
        {
          "name": "bloodgroup",
          "label": "Blood Group",
          "value":'',
          "options":[
                    {'valueLabel' : 'A+'},
                    {'valueLabel' : 'A-'},
                    {'valueLabel' : 'B+'},
                    {'valueLabel' : 'B-'},
                    {'valueLabel' : 'O+'},
                    {'valueLabel' : 'O-'},
                  ],
          "type":"dropdown",
          "placeholder":"Search / Select Option from DropDown",
          "validatorPresence": true,
          "validators":{
          "required": true,
          }
        },
        {
          "name": "interestedCourse",
          "label": "Interested Course",
          "value":'',
          "options":[
                    {'id':1,'valueLabel' : 'CSE'},
                    {'id':2,'valueLabel' : 'ECE'},
                    {'id':3,'valueLabel' : 'E&I'},
                  ],
          "type":"checkboxMultiple",
          "placeholder":"",
          "validatorPresence": true,
          "validators":{
          "required": true,
          }
        },
        {
          "name": "vehicletype",
          "label": "Mode of Transmission",
          "value":'',
          "options":[
                    {'valueLabel' : 'Bike', 'id':1},
                    {'valueLabel' : 'Car', 'id':2},
                    {'valueLabel' : 'Boat', 'id':3},
                    {'valueLabel' : 'Flight', 'id':4},
                    {'valueLabel' : 'Tank', 'id':5},
                  ],
          "type":"radio",
          "placeholder":"",
          "validatorPresence": true,
          "validators":{
          "required": true,
          }
        },
        {
          "name": "termsandconditions",
          "label": "Terms and Conditions",
          "value":'',
          "options":[
                    {'valueLabel' : 'Terms and Conditions', 'id':1000},
                  ],
          "termsLink":'https://www.google.com/',
          "type":"termsandconditions",
          "placeholder":"",
          "validatorPresence": true,
          "validators":{
              "required": true,
          }
        }
      ]
  }

  for(let formFields of this.dynamicJsonForm.controls){
    let validatorsToAdd : any = []
    console.log(formFields)
    if(formFields.validatorPresence){
      for(let key in formFields.validators){
        let value = formFields.validators[key]
        console.log(key, ":" ,value)
        switch (key){
          case 'required' :
            validatorsToAdd.push(Validators.required);
            break;
          case 'minLength' :
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength' :
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern' :
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'min' :
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max' :
            validatorsToAdd.push(Validators.max(value));
            break;
        }
      }
      // this.dynamicForm.addControl(formFields.name,this.fb.control(formFields.value,validatorsToAdd));
      this.dynamicForm.addControl(formFields.name,this.fb.control('',validatorsToAdd));
    }
    else{
      this.dynamicForm.addControl(formFields.value,this.fb.control(formFields.value));
    }
    
  }
  }
  checkedItems: any = []
  checkBoxChecked(e:any){
    console.log(e.target);
    console.log("name : ",e.target.name);
    let formCheckBoxName  = e.target.name 
    this.checkedItems.push(e.target.value);
    console.log("Checked Items : ", this.checkedItems);
  }

  submitForm(){
    this.formSubmitted = true;
    if(this.dynamicForm.invalid){
      alert("form is invalid")
    }else{
      alert("form is submitted")
      this.dynamicForm.value.formCheckBoxName = this.checkedItems
      console.log("isValidForm : ",this.dynamicForm.valid)
      console.log("submitted form : \n",this.dynamicForm.value)
    } 
  }

  today=new Date();
  maxDate=new Date();
  // minDate=new Date();
  showToday : any
  particularPast:any;
  particularFuture:any;
  // dateOperations(){
  //   var year = this.today?.getFullYear();
  //   var month : any = this.today?.getMonth()+1;
  //   var day = this.today?.getDate();
  //   if(month<10){
  //     month = "0"+month
  //   }
  //   this.showToday = year +"-"+ month +"-"+day
  //   console.log("mindate : ",this.showToday)

  //   for(let dateObj in this.dynamicJsonForm.controls){
      
  //   }

  // }

  lettersOnly(event: any) {
    var charCode = event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8 || charCode == 32)
      return true;
    else
      return false;
  }
  numberOnly(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
