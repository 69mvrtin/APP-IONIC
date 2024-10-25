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
  message: string = '';  // Propiedad para almacenar el mensaje
  isSuccess: boolean = false;  // Propiedad para controlar el estado de éxito

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController,
  ) {}

  async login() {
    // Obtener usuarios almacenados
    const users = await this.userService.getUsers();
    
    // Verificar si las credenciales son correctas
    const user = users.find((u: { username: string; password: string; }) => 
      u.username === this.username && u.password === this.password
    );

    if (user) {
      this.userService.setUsername(this.username); // Guarda el nombre del usuario
      this.router.navigate(['/home']);
      this.message = 'Inicio de sesión exitoso.'; // Mensaje de éxito
      this.isSuccess = true; // Indica éxito
    } else {
      this.presentAlert('Credenciales Incorrectas', 'El nombre de usuario o la contraseña son incorrectos. Por favor, inténtalo de nuevo.');
      this.message = 'Credenciales incorrectas'; // Mensaje de error
      this.isSuccess = false; // Indica error
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            // Aquí puedes agregar cualquier lógica adicional que desees
          }
        }
      ],
      cssClass: 'custom-alert' // Clase CSS personalizada
    });
    await alert.present();
  }
}
