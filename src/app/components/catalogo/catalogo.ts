import { Component, computed, inject, signal } from '@angular/core';
import { Product } from '../../models/producto.model';
import { ProductsService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { ProductCardComponent } from '../product-card/product-card';
import { CarritoComponent } from '../carrito/carrito';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
})
export class CatalogoComponent {
  products = signal<Product[]>([]);
  
  private productoService = inject(ProductsService);
  private carritoService = inject(CarritoService);

  constructor() {
    this.productoService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Error:', err),
    });
  }

  productosFiltrados = computed(() => {
    const term = this.productoService.searchTerm().toLowerCase();
    const listaOriginal = this.products(); 

    if (!term) 
      return listaOriginal;

    return listaOriginal.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.category.toLowerCase().includes(term)
    );
  });

  inStockCount = computed(() => this.products().filter(p => p.inStock).length);

  agregar(producto: Product) {
    this.carritoService.agregar(producto);
  }
}