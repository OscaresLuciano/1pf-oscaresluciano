import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: []
})
export class ToolbarComponent {
  title = 'Proyecto Final - Entrega final'
  @Output()
  toggleSidebar = new EventEmitter();

}
