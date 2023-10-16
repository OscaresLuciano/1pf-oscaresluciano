import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formErrors'
})
export class FormErrorsPipe implements PipeTransform {

  transform(value: ValidationErrors | null | undefined, ...args: unknown[]): unknown {
    
    if (!value) return '';

    const errorsMesages: string[] = [];

    if (value) {

      if ('required' in value) {
        errorsMesages.push('Este campo es requerido.');
      }
  
      if ('minlength' in value) {
        errorsMesages.push('Debe tener al menos 3 caracteres.');
      }
  
      if ('maxlength' in value) {
        errorsMesages.push('Debe tener 20 caracteres como máximo.');
      }
  
      if ('email' in value) {
        errorsMesages.push('Debe ser un correo valido.');
      }

    }
  
    return errorsMesages.join(' ');

  }

}
