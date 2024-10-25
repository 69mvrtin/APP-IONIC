import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/app/user.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showMenu = false;
  username: string = '';
  weatherData: any; // Considera definir un tipo específico para tus datos del clima

  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private weatherService: WeatherService
  ) {}

  async ngOnInit() {
    try {
      const username = await this.userService.getUsername();
      if (username) {
        this.username = username;
        this.getUserLocation();
      } else {
        console.warn('No se encontró un nombre de usuario almacenado.');
      }
    } catch (error) {
      console.error('Error al obtener el nombre de usuario', error);
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
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
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Contacto',
      message: '¿Deseas contactarnos por WhatsApp?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Abrir WhatsApp',
          handler: () => {
            window.open('https://wa.me/+56940974175', '_blank');
          },
        },
      ],
    });
    await alert.present();
  }
}
