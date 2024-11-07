import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userData: any = {};
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.userData = await this.userService.getUserData();
  }

  async saveChanges() {
    if (this.newPassword !== this.confirmPassword) {
      await this.showAlert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Actualizar los datos del usuario
    if (this.newPassword) {
      this.userData.password = this.newPassword;
    }

    await this.userService.updateUserData(this.userData);
    await this.showAlert('Éxito', '¡Perfil actualizado correctamente!');
    this.router.navigate(['/profile']);
  }

  cancelEdit() {
    this.router.navigate(['/profile']);
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
