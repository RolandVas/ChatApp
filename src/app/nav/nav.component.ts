import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelComponent } from '../dialog-c/add-channel/add-channel.component';
import { FirebaseService } from '../_service/firebase.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  $channels;

  constructor(public dialog: MatDialog, public fbService: FirebaseService) { }

  ngOnInit(): void {
    this.fbService.getChannels().subscribe( channels => {
      this.$channels = channels
    })
  }

  openDialog() {
    this.dialog.open(AddChannelComponent)
  }


}
