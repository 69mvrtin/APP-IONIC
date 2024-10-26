import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  courses = [
    { id: 1, title: 'Curso de Programación', description: 'Aprende los fundamentos de la programación.' },
    { id: 2, title: 'Curso de Diseño Web', description: 'Crea sitios web atractivos y funcionales.' },
    { id: 3, title: 'Curso de Marketing Digital', description: 'Mejora tus habilidades en marketing online.' },
    { id: 4, title: 'Curso de Fotografía', description: 'Aprende a capturar momentos únicos.' },
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
