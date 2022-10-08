import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chat } from 'src/app/_interface/chat';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  msg: string;
  msgObject: Chat;

  allMessage: string [] = [];

  constructor(private firestore: AngularFirestore) { 
    this.msgObject = {
      message: [],
      user: 'Roland' 
    }
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.msgObject.message.push(this.msg)
    
    this.firestore
    .collection('message')
    .add(this.msgObject)
    .then( (message: any) => {
      console.log('save:', message)
    });
    this.msg = '';
  }

}
