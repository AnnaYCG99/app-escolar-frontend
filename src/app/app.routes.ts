import { Routes } from '@angular/router';
import { LoginScreen } from './screens/login-screen/login-screen';

export const routes: Routes = [
  { path: '', component: LoginScreen, pathMatch: 'full' },
  { path: 'login', component: LoginScreen },
];