import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/app/_interface/channel';
import { Chat } from 'src/app/_interface/chat';
import { ChatService } from 'src/app/_service/chat.service';
import { FirebaseService } from 'src/app/_service/firebase.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  dateToday = new Date();
  currentTime = ('0' + this.dateToday.getHours()).slice(-2) + ':' + ('0' + this.dateToday.getMinutes()).slice(-2);
  currentDate = this.dateToday.getFullYear() + '-' + ('0' + (this.dateToday.getMonth() + 1)).slice(-2) + '-' + ('0' + this.dateToday.getDate()).slice(-2);
  messageTime

  msg: string;
  msgObject: Chat;
  channelID: string;

  date
  time

  currentChannel

  messages

  allMessages = []

  constructor
    (
      private firestore: AngularFirestore,
      private route: ActivatedRoute,
      public fbService: FirebaseService,
      public chatService: ChatService,
      private auth: AngularFireAuth
    ) {
    this.msgObject = {
      message: '',
      user: '',
      timeStamp: '',
      time: ''
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.channelID = paramMap.get('id');
      console.log('channel ID:', this.channelID)

      this.getCurrentChannel()
      this.getMessageForCurrentChannel()
    });

    this.auth.user.subscribe(user => {
      this.msgObject.user = user?.displayName
      console.log(user)
    })

  }

  sendMessage() {
    this.date = new Date();
    this.time = this.dateToday.getTime()
    this.messageTime = this.currentTime + ' ' + this.currentDate
    this.msgObject.timeStamp = this.time
    this.msgObject.time = this.messageTime

    this.auth.user.subscribe(user => {
      this.msgObject.user = user.displayName
    })

    this.firestore
      .collection('channel')
      .doc(this.channelID)
      .collection('message')
      .add(this.msgObject)
      .then((message: any) => {
        console.log('save:', message)
      });

    this.msgObject.message = '';
  }


  //can i call this function from chatService
  //an how i get the current channel from chatService
  getCurrentChannel() {
    this.firestore
      .collection('channel')
      .doc(this.channelID)
      .valueChanges()
      .subscribe((channel: any) => {
        this.currentChannel = channel
        console.log(channel);

      })
  }

  // can i call this function from chatService
  // an how i get the current messages for current channel from chatService
  getMessageForCurrentChannel() {
    this.firestore
      .collection('channel')
      .doc(this.channelID)
      .collection('message')
      .valueChanges()
      .subscribe((message: any) => {
        //sort the messages in chronological order
        this.messages = message.sort(
          (A, B) => {return A.timeStamp - B.timeStamp} // whay the return is necessary?
        )

      })
  }


}
