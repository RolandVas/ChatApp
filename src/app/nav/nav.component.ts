import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelComponent } from '../dialog-c/add-channel/add-channel.component';
import { ChatService } from '../_service/chat.service';
import { FirebaseService } from '../_service/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  $channels;
  $sortedChannels
  currentUserName

  constructor(
    public dialog: MatDialog,
    public fbService: FirebaseService,
    public chat: ChatService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.fbService.getChannels().subscribe( channels => {
      this.$channels = channels

      this.$sortedChannels = this.$channels.sort(
        (A, B) => A.time - B.time
       )
    })

    this.getCurrentUserName()

  }

  getCurrentUserName() {
    this.auth.currentUser.then(user => {
      this.currentUserName = user.displayName
    })
  }



  openDialog() {
    this.dialog.open(AddChannelComponent)
  }



}
