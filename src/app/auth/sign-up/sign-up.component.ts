import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/_service/firebase.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public registerForm: FormGroup = new FormGroup({
    userName: new FormControl('', [
      Validators.required
    ], []),
    email: new FormControl('', [
      Validators.required
    ], []),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ], []),
  });

  constructor(private fbService: FirebaseService) { }

  ngOnInit(): void {
  }

  createUser() {
    const {userName, email, password} = this.registerForm.value;
    this.fbService.signup(userName, email, password)
  }

}
