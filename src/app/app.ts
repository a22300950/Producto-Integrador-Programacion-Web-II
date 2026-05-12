import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SearchBarComponent } from './components/search-bar/search-bar';
import { ToolbarComponent } from './components/toolbar/toolbar';
import { MisPedidosComponent } from './components/mis-pedidos/mis-pedidos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, MisPedidosComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    console.log('AppComponent initialized');
  }
}
