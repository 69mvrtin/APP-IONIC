import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { CameraService } from './camera.service'; // Importamos el servicio de cámara

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private cameraService: CameraService) { }

  // Métodos relacionados con el usuario

  // Obtiene el nombre de usuario almacenado en el almacenamiento local
  async getUsername(): Promise<string | null> {
    const { value } = await Storage.get({ key: 'username' });
    return value;
  }

  // Establece el nombre de usuario en el almacenamiento local
  async setUsername(username: string) {
    await Storage.set({ key: 'username', value: username });
  }

  // Obtiene los datos completos del usuario desde el almacenamiento local
  async getUserData(): Promise<any> {
    const { value } = await Storage.get({ key: 'userData' });
    return value ? JSON.parse(value) : {};
  }

  // Establece los datos completos del usuario en el almacenamiento local
  async updateUserData(userData: any) {
    await Storage.set({ key: 'userData', value: JSON.stringify(userData) });
  }

  // Obtiene las iniciales del usuario (por ejemplo, 'AB')
  async getUserInitials(): Promise<string> {
    const userData = await this.getUserData();
    const initials = (userData.firstName && userData.lastName) 
      ? (userData.firstName[0] + userData.lastName[0]).toUpperCase()
      : '';
    return initials;
  }

  // Establece la foto de perfil en el almacenamiento local
  async setProfilePic(profilePic: string) {
    await Storage.set({ key: 'profilePic', value: profilePic });
  }

  // Obtiene la foto de perfil del almacenamiento local
  async getProfilePic(): Promise<string> {
    const { value } = await Storage.get({ key: 'profilePic' });
    return value || ''; // Devuelve la URL de la foto de perfil, o cadena vacía si no está definida
  }

  // Nueva función para capturar una foto y guardarla como foto de perfil
  async captureAndSetProfilePic(): Promise<void> {
    // Capturamos la foto utilizando el servicio de cámara
    const photo = await this.cameraService.capturePhoto();
    if (photo) {
      await this.setProfilePic(photo); // Guardamos la foto en el almacenamiento
      console.log('Profile picture updated');
    } else {
      console.error('Failed to capture photo');
    }
  }

  // Métodos para manejar los cursos

  // Obtener los cursos de un usuario
  async getCourses(username: string): Promise<any[]> {
    const { value } = await Storage.get({ key: `courses_${username}` });
    return value ? JSON.parse(value) : [];
  }

  // Agregar un curso al usuario
  async addCourse(username: string, course: any) {
    const courses = await this.getCourses(username);
    courses.push(course);
    await Storage.set({ key: `courses_${username}`, value: JSON.stringify(courses) });
  }

  // Eliminar un curso del usuario
  async deleteCourse(username: string, courseTitle: string) {
    const courses = await this.getCourses(username);
    const updatedCourses = courses.filter(course => course.title !== courseTitle);
    await Storage.set({ key: `courses_${username}`, value: JSON.stringify(updatedCourses) });
  }

  // Métodos de autenticación (login/logout)

  // Iniciar sesión (simulación)
  async login(username: string, password: string): Promise<boolean> {
    // Lógica de autenticación aquí (puedes usar una base de datos real o un mock)
    // Ejemplo de inicio de sesión exitoso
    return true;
  }

  // Cerrar sesión (simulación)
  async logout(): Promise<void> {
    await Storage.remove({ key: 'username' });
    await Storage.remove({ key: 'userData' });
    await Storage.remove({ key: 'profilePic' });
  }

  // Obtener todos los usuarios (simulación)
  async getUsers(): Promise<any[]> {
    const { value } = await Storage.get({ key: 'users' });
    return value ? JSON.parse(value) : [];
  }

  // Agregar un nuevo usuario (simulación)
  async addUser(username: string, password: string, firstName: string, lastName: string) {
    const users = await this.getUsers();
    const newUser = { username, password, firstName, lastName };
    users.push(newUser);
    await Storage.set({ key: 'users', value: JSON.stringify(users) });
  }

  // Cambiar la contraseña de un usuario
  async changePassword(username: string, newPassword: string): Promise<boolean> {
    const users = await this.getUsers();
    const user = users.find(u => u.username === username);
    if (user) {
      user.password = newPassword;
      await Storage.set({ key: 'users', value: JSON.stringify(users) });
      return true;
    }
    return false;
  }
}
