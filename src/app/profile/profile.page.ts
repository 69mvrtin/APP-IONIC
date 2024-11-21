import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData: any = {}; // Para almacenar los datos del usuario
  profilePic: string = ''; // Para almacenar la URL de la foto de perfil

  constructor(private userService: UserService) { }

  async ngOnInit() {
    try {
      // Cargar los datos del usuario desde el servicio
      const username = await this.userService.getUsername();
      if (username) {
        this.userData = await this.userService.getUserData();
        this.profilePic = await this.userService.getProfilePic(); // Cargar la foto de perfil
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
  }

  // Cambiar la foto de perfil usando un input de tipo file
  async changeProfilePic(event: any) {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        this.profilePic = e.target.result; // Mostrar la imagen seleccionada
        await this.userService.setProfilePic(this.profilePic); // Guardar la imagen en el almacenamiento
      };
      reader.readAsDataURL(file); // Leer el archivo como URL de datos
    }
  }

  // Tomar una foto con la cámara
  async captureProfilePic() {
    try {
      await this.userService.captureAndSetProfilePic(); // Llama al método del UserService
      this.profilePic = await this.userService.getProfilePic(); // Actualiza la foto después de capturarla
    } catch (error) {
      console.error('Error capturing profile photo:', error);
    }
  }
}
