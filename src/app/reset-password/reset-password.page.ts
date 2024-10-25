import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  username: string = '';
  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private userService: UserService,
    private alertController: AlertController
  ) {}

  async resetPassword() {
    const users = await this.userService.getUsers();
    
    // Verificar si el usuario existe
    const user = users.find((u: { username: string; }) => u.username === this.username);
    
    if (user) {
      // Aquí puedes agregar la lógica para enviar el enlace de restablecimiento
      // Por ahora, solo mostraremos un mensaje de éxito
      this.message = 'Se ha enviado un enlace para restablecer la contraseña a tu correo electrónico.';
      this.isSuccess = true;

      // Opcional: Mostrar un alert
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: this.message,
        buttons: ['OK']
      });
      await alert.present();
    } else {
      this.message = 'Usuario no encontrado.';
      this.isSuccess = false;
    }
  }
}
