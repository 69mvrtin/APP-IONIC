import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router'; // Si deseas redirigir a otra página

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any = {}; // Propiedad para almacenar los datos del usuario

  constructor(
    private userService: UserService,
    private router: Router // Si decides redirigir a una página de edición
  ) {}

  async ngOnInit() {
    try {
      // Cargar los datos del usuario desde el servicio
      const username = await this.userService.getUsername();
      if (username) {
        this.userData = await this.userService.getUserData();
        console.log('User data loaded:', this.userData);
      } else {
        console.warn('No username found in localStorage');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  // Método que será llamado al hacer clic en el botón de edición
  editProfile() {
    // Aquí puedes agregar la lógica para editar el perfil. Por ejemplo, podrías navegar a una página de edición
    console.log('Redirecting to edit profile page...');
    this.router.navigate(['/edit-profile']); // Suponiendo que tienes una página /edit-profile para editar el perfil
  }
}
