import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eapp';
  showSidebar: boolean = false;


  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

}
