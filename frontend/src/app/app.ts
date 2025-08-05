import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/layout/header/header";
import { NzLayoutComponent, NzLayoutModule } from "ng-zorro-antd/layout";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, NzLayoutComponent, NzLayoutModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'frontend';
}
