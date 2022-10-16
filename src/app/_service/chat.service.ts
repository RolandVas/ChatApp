import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Channel } from '../_interface/channel';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  $channel: Channel;

  currentChannel;

  constructor(private firestore: AngularFirestore, private router: Router) { }

  saveChannelOnFirebase(channel) {
    this.firestore
    .collection('channel')
    .add(channel)
    .then( (channel: any) => {
      this.updateChannelWithId(channel.id)
      this.router.navigateByUrl('home/' + channel.id)
    });
  }

  updateChannelWithId(id) {
    this.firestore
        .collection('channel')
        .doc(id)
        .update({ id: id });
  }

  // getCurrentChannel(id) {
  //   this.firestore
  //     .collection('channel')
  //     .doc(id)
  //     .valueChanges()
  //     .subscribe((channel: any) => { 
  //       this.currentChannel = channel
  //       console.log(channel);
        
  //     })
  // }
}
