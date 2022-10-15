import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Channel } from '../_interface/channel';
import { User } from '../_interface/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isAuthenticated: boolean;
  user: User;

  constructor(private auth: AngularFireAuth, private router: Router, private firestore: AngularFirestore) { }
  

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
    return from(this.auth.signInWithEmailAndPassword(email, password)).subscribe(()=>{
      this.isAuthenticated = true;
      this.router.navigate([''])
    })
  }

  logout() {
    return from(this.auth.signOut()).subscribe(()=>{
      this.isAuthenticated = false;
      this.router.navigate([{outlets: {room: null}}]).then(()=>{
        this.router.navigate(['/login'])
      })
      
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
  
  getChannels() {
    return this.firestore
      .collection('channel')
      .valueChanges()
  }


}
