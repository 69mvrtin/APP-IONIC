import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  constructor() { }
  
  ngOnInit() {
  }

  toggleMenu() {
    // Aquí puedes agregar la lógica para alternar el menú
    console.log('Menu toggled');
  }
}
