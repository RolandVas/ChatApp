import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
    // need to find a better solution for login detection
    this.auth.user.subscribe(user => {
      this.user = user
    })
  }
  
  }
