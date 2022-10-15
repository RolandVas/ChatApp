import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Channel } from '../_interface/channel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  $channel: Channel;

  constructor(private firestore: AngularFirestore, private router: Router) { }

  saveChannelOnFirebase(channel) {
    this.firestore
    .collection('channel')
    .add(channel)
    .then( (channel: any) => {
      this.router.navigateByUrl('/channel/' + channel.id)
      console.log('save channel:', channel)
      this.updateChannelWithId(channel.id)
    });
  }

  updateChannelWithId(id) {
    this.firestore
        .collection('channel')
        .doc(id)
        .update({ id: id });
  }
}
