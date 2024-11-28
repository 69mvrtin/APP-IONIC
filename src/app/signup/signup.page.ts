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
  email: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  userType: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async register() {
    if (!this.userType) {
      await this.showAlert('Error', 'Por favor selecciona si eres Alumno o Profesor.');
      return;
    }

    const users = (await this.userService.getUsers()) || [];
    const userExists = users.some((user: { username: string }) => user.username === this.username);

    if (userExists) {
      await this.showAlert('Error', 'El nombre de usuario ya existe.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      await this.showAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    await this.userService.addUser(this.username, this.password, this.firstName, this.lastName, this.userType);
    this.router.navigate(['/login']);
    await this.showAlert('Registro Exitoso', 'Tu cuenta ha sido creada correctamente.');
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
