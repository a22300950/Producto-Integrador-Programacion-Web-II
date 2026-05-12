import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-pedidos.html',
  styleUrls: ['./mis-pedidos.css']
})
export class MisPedidosComponent {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        console.log('Pedidos recibidos:', data);
        // Aseguramos que sea array y no undefined/null
        this.pedidos = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.error('Error al obtener pedidos:', err);
        this.pedidos = [];
      }
    });
  }
}
