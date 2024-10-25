import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  username: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async register() {
    const users = await this.userService.getUsers() || [];
    const userExists = users.some((user: { username: string }) => user.username === this.username);

    if (userExists) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'El nombre de usuario ya existe.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    await this.userService.addUser(this.username, this.password);
    this.router.navigate(['/login']);
  }
}
