import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { PageListComponent } from './page-list/page-list.component';
import { AngularFireAuthGuard, canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RoomComponent } from './chat/room/room.component';
import { AppComponent } from './app.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectAuthorizedToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectAuthorizedToHome }
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectAuthorizedToHome }
  },
  {
    path: ':id',
    component: RoomComponent,
    outlet: 'room', canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
