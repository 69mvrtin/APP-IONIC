import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  // Agrega un nuevo usuario
  async addUser(username: string, password: string) {
    const users = await this.getUsers() || [];
    users.push({ username, password });
    await Storage.set({ key: 'users', value: JSON.stringify(users) });
  }

  // Obtiene todos los usuarios
  async getUsers() {
    const { value } = await Storage.get({ key: 'users' });
    return JSON.parse(value || '[]'); // Asegura que devuelva un array
  }

  // Obtiene el nombre de usuario almacenado
  async getUsername() {
    const { value } = await Storage.get({ key: 'username' });
    return value;
  }

  // Establece el nombre de usuario
  async setUsername(username: string) {
    await Storage.set({ key: 'username', value: username });
  }

  // Elimina el nombre de usuario
  async removeUsername() {
    await Storage.remove({ key: 'username' });
  }
}
