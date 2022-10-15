import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/_service/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ], []),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ], []),
  });

  constructor(private fbService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    const {email, password} = this.loginForm.value;
    this.fbService.login(email, password)
  }
}
