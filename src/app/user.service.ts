// user.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  async addUser(username: string, password: string, firstName: string, lastName: string) {
    const users = await this.getUsers() || [];
    users.push({ username, password, firstName, lastName });
    await Storage.set({ key: 'users', value: JSON.stringify(users) });
  }

  async getUsers() {
    const { value } = await Storage.get({ key: 'users' });
    return JSON.parse(value || '[]');
  }

  async getUsername() {
    const { value } = await Storage.get({ key: 'username' });
    return value;
  }

  async setUsername(username: string) {
    await Storage.set({ key: 'username', value: username });
  }

  async removeUsername() {
    await Storage.remove({ key: 'username' });
  }

  async getUserData() {
    const { value } = await Storage.get({ key: 'userData' });
    return JSON.parse(value || '{}');
  }

  async updateUserData(userData: any) {
    await Storage.set({ key: 'userData', value: JSON.stringify(userData) });
  }

  async getUserInitials() {
    const userData = await this.getUserData();
    if (userData.firstName && userData.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
    }
    return '';
  }

  // New method to log out
  async logout() {
    await Storage.clear(); // Clears all stored keys related to user data
  }
}
