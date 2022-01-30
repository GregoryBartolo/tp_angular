import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {
  userForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(){
    if(this.userForm.valid){
      //voir avec greg pour faire l'appel API (normalement j'ai dfeja vue le register dans l'api)
      this.http.post('/register', this.userForm.value)
      .subscribe((response)=>{
        console.log('repsonse ',response);
      })
    } else {
      alert('User form is not valid!!')
    }
  }

}
