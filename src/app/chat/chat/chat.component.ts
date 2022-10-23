import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() chat = []


  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {

  }

  deleteMessage(id, channelID) {
    this.firestore
      .collection('channel')
      .doc(channelID)
      .collection('message')
      .doc(id)
      .delete()
      .then(() => {
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

}
