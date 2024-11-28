// app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard] },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesPageModule), canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule), canActivate: [AuthGuard] },
  { path: 'edit-profile', loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfilePageModule), canActivate: [AuthGuard] },
  { path: 'horario', loadChildren: () => import('./horario/horario.module').then(m => m.HorarioPageModule), canActivate: [AuthGuard] },
  { path: 'scan', loadChildren: () => import('./scan/scan.module').then(m => m.ScanPageModule), canActivate: [AuthGuard] },
  { path: 'profile-profesor', loadChildren: () => import('./profile-profesor/profile-profesor.module').then( m => m.ProfileProfesorPageModule),canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
