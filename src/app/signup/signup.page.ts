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

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async register() {
    // Validación de existencia del usuario
    const users = (await this.userService.getUsers()) || [];
    const userExists = users.some((user: { username: string }) => user.username === this.username);

    if (userExists) {
      await this.showAlert('Error', 'El nombre de usuario ya existe.');
      return;
    }

    // Validación de contraseñas coincidentes
    if (this.password !== this.confirmPassword) {
      await this.showAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Registro de usuario
    await this.userService.addUser(this.username, this.password);

    // Guardar los datos del usuario (por ejemplo, el correo electrónico)
    const userData = {
      username: this.username,
      email: this.email,  // Guarda el correo
    };
    await this.userService.updateUserData(userData);  // Guarda los datos en el localStorage

    await this.showAlert('Registro Exitoso', '¡Usuario registrado correctamente!');
    this.router.navigate(['/login']);
  }

  // Método para mostrar alerta
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
