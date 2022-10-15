import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService } from './_service/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Chat_app';

  user

  constructor(private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.user.subscribe(user => {
      this.user = user
    })

    console.log('user: ', this.user)
  }
  }
