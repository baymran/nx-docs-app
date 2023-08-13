import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  standalone: true,
  imports: [RouterModule, NgIf],
  selector: 'documents-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'docs';
}
