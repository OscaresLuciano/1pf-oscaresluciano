import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from 'src/app/dashboard/pages/alumnos/modals';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: Alumno, ...args: unknown[]): unknown {
    const firstArg = args[0];
    const result = `${value.name} ${value.lastName}`;
    switch (firstArg) {
      case 'lowercase':
        return result.toLowerCase();
      case 'uppercase':
        return result.toUpperCase();
      
        default:
          return 'Invalid argument';
    }
  }

}
