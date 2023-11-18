import { Pipe, PipeTransform } from '@angular/core';
import { Usuario } from 'src/app/core/models';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: Usuario, ...args: unknown[]): unknown {
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
