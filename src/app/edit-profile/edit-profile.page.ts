import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userData: any = {};

  constructor(private userService: UserService, private router: Router) {}

  async ngOnInit() {
    try {
      this.userData = await this.userService.getUserData();
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  async saveChanges() {
    try {
      await this.userService.updateUserData(this.userData);
      console.log('User data updated successfully:', this.userData);
      this.router.navigate(['/profile']);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  }

  cancelEdit() {
    this.router.navigate(['/profile']);
  }
}
