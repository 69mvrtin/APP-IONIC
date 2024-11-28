import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  // Obtener nombre de usuario almacenado
  async getUsername(): Promise<string | null> {
    const { value } = await Storage.get({ key: 'username' });
    return value;
  }

  // Establecer nombre de usuario en el almacenamiento local
  async setUsername(username: string) {
    await Storage.set({ key: 'username', value: username });
  }

  // Obtener datos de usuario
  async getUserData(): Promise<any> {
    const { value } = await Storage.get({ key: 'userData' });
    return value ? JSON.parse(value) : {};
  }

  // Actualizar datos de usuario
// Método para actualizar los datos del usuario, incluido el tipo
async updateUserData(userData: any) {
  await Storage.set({ key: 'userData', value: JSON.stringify(userData) });
}

  // Obtener iniciales del usuario
  async getUserInitials(): Promise<string> {
    const userData = await this.getUserData();
    const initials = (userData.firstName && userData.lastName)
      ? (userData.firstName[0] + userData.lastName[0]).toUpperCase()
      : '';
    return initials;
  }

  // Establecer foto de perfil
  async setProfilePic(profilePic: string) {
    await Storage.set({ key: 'profilePic', value: profilePic });
  }

  // Obtener foto de perfil
  async getProfilePic(): Promise<string> {
    const { value } = await Storage.get({ key: 'profilePic' });
    return value || '';
  }

  // Capturar y establecer la foto de perfil
  async captureAndSetProfilePic(): Promise<void> {
    // Implementa la lógica de captura de foto si es necesario
  }

  // Obtener cursos de un usuario
  async getCourses(username: string): Promise<any[]> {
    const { value } = await Storage.get({ key: `courses_${username}` });
    return value ? JSON.parse(value) : [];
  }

  // Agregar un curso a un usuario
  async addCourse(username: string, course: any) {
    const courses = await this.getCourses(username);
    courses.push(course);
    await this.saveCourses(username, courses);
  }

  // Eliminar un curso de un usuario
  async deleteCourse(username: string, courseTitle: string) {
    let courses = await this.getCourses(username);
    courses = courses.filter(course => course.title !== courseTitle);
    await this.saveCourses(username, courses);
  }

  // Guardar los cursos en el almacenamiento local
  private async saveCourses(username: string, courses: any[]) {
    await Storage.set({ key: `courses_${username}`, value: JSON.stringify(courses) });
  }

  // Obtener todos los usuarios registrados
  async getUsers(): Promise<any[]> {
    const { value } = await Storage.get({ key: 'users' });
    return value ? JSON.parse(value) : [];
  }

  // Agregar un nuevo usuario
  async addUser(username: string, password: string, firstName: string, lastName: string, userType: string) {
    const users = await this.getUsers();
    const newUser = { username, password, firstName, lastName, userType };
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

  // Método de inicio de sesión con validación de usuario y redirección según el tipo de usuario
  async login(username: string, password: string): Promise<boolean> {
    const users = await this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      await this.updateUserData(user);
      return true;
    }

    return false;
  }

  // Método de cierre de sesión
  async logout(): Promise<void> {
    await Storage.remove({ key: 'username' });
    await Storage.remove({ key: 'userData' });
    await Storage.remove({ key: 'profilePic' });
  }

  // Obtener el tipo de usuario
  async getUserType(): Promise<string | null> {
    const userData = await this.getUserData();
    return userData.userType || null;
  }
}
