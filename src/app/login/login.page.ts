import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    const users = await this.userService.getUsers();
    const user = users.find((u: { username: string; password: string }) =>
      u.username === this.username && u.password === this.password
    );
  
    if (user) {
      // Guardamos todos los datos del usuario, incluido el tipo
      await this.userService.updateUserData(user);
      await this.userService.setUsername(this.username);
      this.router.navigate(['/home']);
      this.message = 'Inicio de sesión exitoso.';
      this.isSuccess = true;
    } else {
      this.presentAlert('Credenciales Incorrectas', 'El nombre de usuario o la contraseña son incorrectos. Por favor, inténtalo de nuevo.');
      this.message = 'Credenciales incorrectas';
      this.isSuccess = false;
    }
  }
  

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [{ text: 'Aceptar' }],
      cssClass: 'custom-alert',
    });
    await alert.present();
  }
}
