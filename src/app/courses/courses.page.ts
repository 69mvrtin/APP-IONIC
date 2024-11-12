import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  courses = [
    { id: 1, title: 'Ingles Avanzado', description: 'Aprende Ingles avananzado.' },
    { id: 2, title: 'Programacion De APP Moviles', description: 'Crea app moviles atractivas y funcionales.' },
    { id: 3, title: 'Arquitectura', description: 'Mejora tus habilidades en marketing online.' },
    { id: 4, title: 'Calidad de Software', description: 'Aprende a capturar momentos únicos.' },
    { id: 5, title: 'Estadistica Descriptiva', description: 'Aprende a capturar momentos únicos.' },
    { id: 6, title: 'Etica para el trabajo', description: 'Aprende a capturar momentos únicos.' },
  ];

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  toggleMenu() {
    console.log('Menu toggled');
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
