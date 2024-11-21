import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular'; // Importar NavController
import { UserService } from '../user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  courses: Array<{ id: number; title: string; description: string; room: string }> = [];
  username: string = '';

  constructor(
    private alertController: AlertController,
    private userService: UserService,
    private navController: NavController // Inyectar NavController
  ) {}

  async ngOnInit() {
    const username = await this.userService.getUsername();
    this.username = username || ''; // Si username es null, asigna una cadena vacía.
    this.courses = await this.userService.getCourses(this.username);
  }

  async addCourse() {
    const alert = await this.alertController.create({
      header: 'Agregar Curso',
      inputs: [
        { name: 'title', placeholder: 'Título del curso' },
        { name: 'description', placeholder: 'Descripción del curso' },
        { name: 'room', placeholder: 'Número de sala', type: 'text' }, // Añadir un campo para seleccionar la sala
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: async (data) => {
            if (data.title && data.description && data.room) {
              // Generar un ID único para el curso
              const newId = Date.now(); // Usamos el tiempo actual como un ID único

              // Llamar al servicio para agregar el curso con id y room
              await this.userService.addCourse(this.username, {
                id: newId, // Agregar el ID al curso
                title: data.title,
                description: data.description,
                room: data.room, // Asignar la sala seleccionada
              });

              // Actualizar la lista de cursos
              this.courses = await this.userService.getCourses(this.username);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteCourse(courseTitle: string) {
    await this.userService.deleteCourse(this.username, courseTitle);
    this.courses = await this.userService.getCourses(this.username);
  }

  // Función para registrar asistencia (redirige a la página scan)
  async registerAttendance(courseId: number, courseRoom: string) {
    console.log(`Registrando asistencia para el curso ID: ${courseId} en la sala ${courseRoom}`);
    // Redirigir a la página scan, pasando los parámetros del curso
    await this.navController.navigateForward(`/scan`, {
      queryParams: { courseId, courseRoom },
    });
  }
}
