import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/app/_interface/channel';
import { ChatService } from 'src/app/_service/chat.service';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss']
})
export class AddChannelComponent implements OnInit {


  $channel: Channel;

  channelForm: FormGroup = new FormGroup({
    channelName: new FormControl('',
      Validators.required,
    ),
    channelDescription: new FormControl(),
  });

  
  constructor(private chatService: ChatService, public dialogRef: MatDialogRef<AddChannelComponent>) {
    this.$channel = {
      name: '',
      description: '',
      id: ''
    }
   }

  ngOnInit(): void {
  }

  onSubmit() {
    const {channelName, channelDescription} = this.channelForm.value;
    this.$channel.name = channelName;
    this.$channel.description = channelDescription;
    this.chatService.saveChannelOnFirebase(this.$channel)
    this.dialogRef.close()
  }



}
