import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  { path: 'login', title: 'Login', component: LoginComponent },
  { path: 'dashboard', title: 'Dashboard', component: DashboardComponent }, //canActivate: [authGuard]},// loadChildren: () => import(‘./users/user.module’).then(m => m.UserModule)} },
  { path: 'signup', title: 'Sign up', component: SignupComponent },
  {
    path: '**', // redirect to dashboard in case of empty or invalid route
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
