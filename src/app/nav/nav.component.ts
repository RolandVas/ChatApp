import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelComponent } from '../dialog-c/add-channel/add-channel.component';
import { ChatService } from '../_service/chat.service';
import { FirebaseService } from '../_service/firebase.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  $channels;
  $sortedChannels

  constructor(public dialog: MatDialog, public fbService: FirebaseService, public chat: ChatService) { }

  ngOnInit(): void {
    this.fbService.getChannels().subscribe( channels => {
      this.$channels = channels

      this.$sortedChannels = this.$channels.sort(
        (A, B) => A.time - B.time
       )
    })

    
  }

 

  openDialog() {
    this.dialog.open(AddChannelComponent)
  }



}
