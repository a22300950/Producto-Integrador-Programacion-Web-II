import { Component, computed, signal } from '@angular/core';
import { Product } from '../../models/producto.model';
import { ProductsService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { ProductCardComponent } from '../product-card/product-card';
import { CarritoComponent } from '../carrito/carrito';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent, CarritoComponent],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
})
export class CatalogoComponent {
  products = signal<Product[]>([]);
  inStockCount = computed(() => this.products().filter(p => p.inStock).length);

  constructor(
    private productsService: ProductsService,
    private carritoService: CarritoService
  ) {
    console.log('CatalogoComponent constructor called');
    this.productsService.getAll().subscribe({
      next: (data) => {
        console.log('Products loaded:', data);
        this.products.set(data);
      },
      error: (err) => console.error('Error loading products:', err),
    });
  }

  agregar(producto: Product) {
    this.carritoService.agregar(producto);
  }
}
