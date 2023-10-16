import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlumnosModalComponent } from './components/alumnos-modal/alumnos-modal.component';
import { Alumno } from './modals';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent {

  userName= '';

  alumnos: Alumno[] = [
  {
    id: 1,
    name: 'Pablo',
    lastName: 'Salazar',
    email: 'pablo@mail.com'
  },
  {
    id: 2,
    name: 'Laura',
    lastName: 'Sosa',
    email: 'lauso@mail.com'
  },
  {
    id: 3,
    name: 'Mateo',
    lastName: 'Ruiz',
    email: 'ruizmate@mail.com'
  }
]

  constructor(
    private matDialog: MatDialog
  ) {}
  
openAlumnosModal(): void {
  this.matDialog.open(AlumnosModalComponent)
  .afterClosed()
  .subscribe({
    next: (nuevoAlumno) => {
      if(!!nuevoAlumno) {
        this.alumnos = [...this.alumnos,{
          ...nuevoAlumno,
          id: new Date().getTime()
        }
      ];
      }
    }
  });
}

onEditAlumno(alumno: Alumno): void {
  this.matDialog
  .open(AlumnosModalComponent, {data: alumno})
  .afterClosed()
  .subscribe({
    next: (alumnoEditado) => {
        if (!!alumnoEditado) {
        this.alumnos = this.alumnos.map((alumnoActual) =>
          alumnoActual.id === alumno.id ? ({...alumnoActual, ...alumnoEditado}) : alumnoActual);
      }
    }
  })
}
onDeleteAlumno(alumnoId: number): void {
  if(confirm('Estás seguro de borrar este alumno?')){
    this.alumnos = [...this.alumnos.filter(
      (alumno) => alumno.id !== alumnoId
    )]
  }
}

}
