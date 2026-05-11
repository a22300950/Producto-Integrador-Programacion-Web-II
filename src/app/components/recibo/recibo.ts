import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { DATOS_EMISOR } from '../../services/carrito.service';

@Component({
  selector: 'app-recibo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recibo.html',
  styleUrls: ['./recibo.css']
})
export class ReciboComponent {
  private carritoService = inject(CarritoService);
  
  emisor = DATOS_EMISOR;
  fecha = new Date();
  folio = Math.floor(Math.random() * 1000) + 1; 

  productos = this.carritoService.productos; 

  total = computed(() => this.carritoService.total());
  subtotal = computed(() => this.total() / 1.16);
  iva = computed(() => this.total() - this.subtotal());

  get totalLetra() {
    return `${this.total().toFixed(2)} PESOS 00/100 M.N.`;
  }

  imprimir() {
    window.print();
  }
}