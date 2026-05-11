import { Component, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { Product } from '../../models/producto.model';
import { Signal } from '@angular/core';
import { ReciboComponent } from '../recibo/recibo';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, CommonModule, RouterModule, ReciboComponent], // NO es CommonModule
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
})
export class CarritoComponent {
  carrito: Signal<Product[]>;
  total = computed(() => this.carritoService.total());

  mostrarRecibo = false;

  constructor(private carritoService: CarritoService) {
    this.carrito = this.carritoService.productos;
  }

  imprimirTicket() {
    window.print();
  }

  quitar(id: number) {
    this.carritoService.quitar(id);
  }

  vaciar() {
    this.carritoService.vaciar();
  }
}
