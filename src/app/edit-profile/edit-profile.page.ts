import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userData: any = {};  // Para almacenar los datos del perfil a editar

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const username = await this.userService.getUsername();
      if (username) {
        this.userData = await this.userService.getUserData();
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  async saveChanges() {
    try {
      await this.userService.updateUserData(this.userData);
      console.log('Profile updated successfully');
      this.router.navigate(['/profile']);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  }

  cancelEdit() {
    this.router.navigate(['/profile']);
  }
}
