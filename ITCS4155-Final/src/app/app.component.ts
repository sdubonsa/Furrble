import { Component } from '@angular/core';

import {pets} from "./pets";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pets = pets;
  title = 'Furrble';
}
