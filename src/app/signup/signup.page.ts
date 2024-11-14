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
  firstName: string = '';  // Nuevo campo
  lastName: string = '';   // Nuevo campo

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async register() {
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

    // Registro de usuario con nombre y apellido
    await this.userService.addUser(this.username, this.password, this.firstName, this.lastName);

    const userData = {
      username: this.username,
      email: this.email,
      firstName: this.firstName,  // Guarda el nombre
      lastName: this.lastName,    // Guarda el apellido
    };
    await this.userService.updateUserData(userData);

    await this.showAlert('Registro Exitoso', '¡Usuario registrado correctamente!');
    this.router.navigate(['/login']);
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
