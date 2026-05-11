import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class ToolbarComponent {
  private carritoService = inject(CarritoService);
  cartCount = computed(() => {
    return this.carritoService.productos().length;
  });
}