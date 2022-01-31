import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {

        if (this.registerForm.invalid) {
            return;
        }

        this.authService.registerIn(this.f['name'].value, this.f['email'].value, this.f['password'].value)
        .subscribe((response) => {
            console.log("inscription réussie");
            this.router.navigate(["/home"], { replaceUrl: true });
        });
  }

}
