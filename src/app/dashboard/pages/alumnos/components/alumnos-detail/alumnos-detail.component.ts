import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos-detail',
  templateUrl: './alumnos-detail.component.html',
  styleUrls: ['./alumnos-detail.component.scss']
})
export class AlumnosDetailComponent {
  
  constructor(private router: Router){}

  goToAlumnos(): void {
    this.router.navigate(['dashboard', 'alumnos']);
  }
}
