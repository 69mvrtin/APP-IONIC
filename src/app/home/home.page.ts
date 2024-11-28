import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';
import { WeatherService } from '../services/weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showMenu = false;
  showNotifications = false;
  username: string = '';
  initials: string = '';
  userType: string = ''; // Nueva variable para almacenar el tipo de usuario
  weatherData: any;
  notifications: Array<{ title: string; message: string }> = [];
  footerPages: Array<{ link: string; icon: string }> = []; // Declaración de footerPages

  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private weatherService: WeatherService,
    private router: Router
  ) {}
  async ngOnInit() {
    try {
      const username = await this.userService.getUsername();
      if (username) {
        this.username = username;
        this.initials = await this.userService.getUserInitials();
        this.userType = await this.userService.getUserType() || 'default'; // Valor por defecto
        // Llama a updateFooterPages después de que userType se haya asignado
        this.updateFooterPages(); 
        this.getUserLocation();
      } else {
        this.router.navigate(['/login']); // Redirigir si no hay sesión activa
      }
      this.loadNotifications();
    } catch (error) {
      console.error('Error al obtener el nombre de usuario', error);
      this.router.navigate(['/login']); // Manejar errores
    }
  }
  
  updateFooterPages() {
    console.log('UserType:', this.userType); // Depuración para verificar el valor de userType
    this.footerPages = [
      { link: '/home', icon: 'home-outline' },
      { link: '/horario', icon: 'calendar-outline' },
      { link: '/scan', icon: 'qr-code-outline' },
      { link: '/notifications', icon: 'notifications-outline' },
      {
        link: this.userType === 'profesor' ? '/profile-profesor' : '/profile',
        icon: 'person-outline'
      }
    ];
  }
  

  // Método para redirigir a la página de perfil adecuada según el tipo de usuario
  navigateToProfile() {
    if (this.userType === 'profesor') {
      this.router.navigate(['/profile-profesor']);
    } else {
      this.router.navigate(['/profile']);
    }
  }

  async logout() {
    await this.userService.logout();
    this.router.navigate(['/login']); // Redirigir al login
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  loadNotifications() {
    this.notifications = [
      { title: 'Nueva actualización', message: 'La aplicación se ha actualizado a la versión 1.0.1.' },
      { title: 'Nuevo mensaje', message: 'Tienes un nuevo mensaje de soporte.' },
    ];
  }

  navigateTo(link: string) {
    this.router.navigate([link]);
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.getWeather(lat, lon);
        },
        (error) => {
          console.error('Error obteniendo la ubicación', error);
        }
      );
    } else {
      console.error('Geolocalización no es soportada por este navegador.');
    }
  }

  getWeather(lat: number, lon: number) {
    this.weatherService.getWeatherByCoords(lat, lon).subscribe({
      next: (data: any) => {
        this.weatherData = data;
      },
      error: (error) => {
        console.error('Error obteniendo el clima', error);
      },
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Contacto',
      message: '¿Deseas contactarnos por WhatsApp?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Abrir WhatsApp', 
          handler: () => {
            window.open('https://wa.me/+56940974175', '_blank');
            return true; // Esto asegura compatibilidad con el tipo esperado
          }
        },
      ],
    });
    await alert.present();
  }

  clearNotifications() {
    this.notifications = [];
  }
}
