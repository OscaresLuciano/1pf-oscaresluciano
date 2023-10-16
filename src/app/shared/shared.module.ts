import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FullNamePipe } from './pipes/full-name.pipe';
import { MatTableModule } from '@angular/material/table';
import { FormErrorsPipe } from './pipes/form-errors.pipe';
import { TextSizeDirective } from './directives/text-size.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    FormErrorsPipe,
    TextSizeDirective
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FullNamePipe,
    MatTableModule,
    FormErrorsPipe,
    TextSizeDirective
  ]
})
export class SharedModule { }
