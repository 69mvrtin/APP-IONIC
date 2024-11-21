import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  // Agregar un nuevo usuario
  async addUser(username: string, password: string, firstName: string, lastName: string) {
    const users = await this.getUsers() || [];
    users.push({ username, password, firstName, lastName, courses: [] });
    await Storage.set({ key: 'users', value: JSON.stringify(users) });
  }

  // Obtener todos los usuarios
  async getUsers() {
    const { value } = await Storage.get({ key: 'users' });
    return JSON.parse(value || '[]');
  }

  // Obtener el nombre de usuario actual
  async getUsername() {
    const { value } = await Storage.get({ key: 'username' });
    return value;
  }

  // Establecer el nombre de usuario actual
  async setUsername(username: string) {
    await Storage.set({ key: 'username', value: username });
  }

  // Eliminar el nombre de usuario actual
  async removeUsername() {
    await Storage.remove({ key: 'username' });
  }

  // Obtener los datos del usuario actual
  async getUserData() {
    const { value } = await Storage.get({ key: 'userData' });
    return JSON.parse(value || '{}');
  }

  // Actualizar los datos del usuario actual
  async updateUserData(userData: any) {
    await Storage.set({ key: 'userData', value: JSON.stringify(userData) });
  }

  // Obtener las iniciales del usuario actual
  async getUserInitials() {
    const userData = await this.getUserData();
    if (userData.firstName && userData.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    }
    return '';
  }

  // Método para restablecer la contraseña
  async changePassword(username: string, newPassword: string): Promise<boolean> {
    const users = await this.getUsers();
    const userIndex = users.findIndex((user: any) => user.username === username);

    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      await Storage.set({ key: 'users', value: JSON.stringify(users) });
      return true;
    }

    return false;
  }

  // Métodos para gestionar cursos
  async addCourse(username: string, course: { id: number; title: string; description: string; room: string }) {
    const users = await this.getUsers();
    const userIndex = users.findIndex((u: any) => u.username === username);

    if (userIndex !== -1) {
      users[userIndex].courses = users[userIndex].courses || [];
      users[userIndex].courses.push(course);
      await Storage.set({ key: 'users', value: JSON.stringify(users) });
    }
  }

  async getCourses(username: string) {
    const users = await this.getUsers();
    const user = users.find((u: any) => u.username === username);
    return user?.courses || [];
  }

  async deleteCourse(username: string, courseTitle: string) {
    const users = await this.getUsers();
    const userIndex = users.findIndex((u: any) => u.username === username);

    if (userIndex !== -1) {
      users[userIndex].courses = users[userIndex].courses.filter(
        (course: any) => course.title !== courseTitle
      );
      await Storage.set({ key: 'users', value: JSON.stringify(users) });
    }
  }

  // Método para cerrar sesión
  async logout() {
    await Storage.remove({ key: 'username' });
  }
}
