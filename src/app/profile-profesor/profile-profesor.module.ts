import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileProfesorPageRoutingModule } from './profile-profesor-routing.module';

import { ProfileProfesorPage } from './profile-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileProfesorPageRoutingModule
  ],
  declarations: [ProfileProfesorPage]
})
export class ProfileProfesorPageModule {}
