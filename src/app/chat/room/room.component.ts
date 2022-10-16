import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/app/_interface/chat';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  msg: string;
  msgObject: Chat;

  channelID: string;

  allMessage: string [] = [];

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) { 
    this.msgObject = {
      message: [],
      user: 'Roland' 
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.channelID = paramMap.get('id');
      console.log('channel ID:', this.channelID)
    });

    
  }

  sendMessage() {
    this.msgObject.message.push(this.msg)
    
    this.firestore
    .collection('channel')
    .doc(this.channelID)
    .collection('message')
    .add(this.msgObject)
    .then( (message: any) => {
      console.log('save:', message)
    });
    
    this.msg = '';
  }

}
