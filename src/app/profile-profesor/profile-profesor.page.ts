import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-profesor',
  templateUrl: './profile-profesor.page.html',
  styleUrls: ['./profile-profesor.page.scss'],
})
export class ProfileProfesorPage implements OnInit {
  // Propiedades para manejar las pestañas
  segmentValue: string = 'info'; // Valor inicial del segmento

  constructor() {}

  ngOnInit() {}

  // Método para manejar el cambio de pestañas (opcional)
  onSegmentChange(event: any) {
    this.segmentValue = event.detail.value;
  }
}
