import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../_interface/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;

  // User Interface
  user: User;

  constructor(private auth: AngularFireAuth, private router: Router, private firestore: AngularFirestore,) { }

  signup(userName: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then( user => {
      this.router.navigate([''])
      console.log('save user: ', this.auth)
      this.user = {
        userName: userName,
        email: email,
        UID: user.user.uid
      }
      this.saveUserInFirabase()
    });
    
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password).then( user => {
      this.router.navigate([''])
    })
  }

  saveUserInFirabase() {
    this.firestore
      .collection('users')
      .add(this.user)
      .catch((err => {
        console.log(err);
      }))
      .then((done =>{
        console.log(done); 
      }))
  }

}
