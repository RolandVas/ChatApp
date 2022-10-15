import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../_service/firebase.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFiller = true;

  constructor(public fbService: FirebaseService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.fbService.logout()
  }
}
