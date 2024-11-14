import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.page.html',
  styleUrls: ['./horario.page.scss'],
})
export class HorarioPage {
  footerPages = [
    { link: '/home', icon: 'home-outline' },
    { link: '/horario', icon: 'calendar-outline' },
    { link: '/scan', icon: 'qr-code-outline' },
    { link: '/notifications', icon: 'notifications-outline' },
    { link: '/profile', icon: 'person-outline' },
  ];

  showNotifications = false;
  notifications = [
    { title: 'Notificación 1', message: 'Mensaje de la notificación 1' },
    { title: 'Notificación 2', message: 'Mensaje de la notificación 2' }
  ];

  constructor(private router: Router) {}

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  navigateTo(link: string) {
    this.router.navigate([link]);
  }

  clearNotifications() {
    this.notifications = [];
  }
}