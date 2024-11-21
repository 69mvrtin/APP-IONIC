import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service'; // Asegúrate de importar el UserService

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {

  username: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  // Método para restablecer la contraseña
  async resetPassword() {
    // Verificar si las contraseñas coinciden
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    // Llamar al método del servicio para cambiar la contraseña
    const success = await this.userService.changePassword(this.username, this.newPassword);

    if (success) {
      // Redirigir a la página de login si el cambio fue exitoso
      this.router.navigate(['/login']);
    } else {
      // Si el cambio no fue exitoso, mostrar un mensaje de error
      this.errorMessage = 'Usuario no encontrado';
    }
  }
}
