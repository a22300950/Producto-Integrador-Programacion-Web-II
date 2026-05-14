import { Component, OnInit, inject, signal } from '@angular/core';
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
export class MisPedidosComponent implements OnInit {
  private pedidoService = inject(PedidoService);
  
  // Usar signal asegura que Angular detecte el cambio de datos al instante
  pedidos = signal<Pedido[]>([]);

  ngOnInit() {
    this.loadPedidos();
  }

  loadPedidos() {
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        // Mapeamos los datos de SQL al signal
        this.pedidos.set(Array.isArray(data) ? data : []);
      },
      error: (err) => {
        console.error('Error al obtener pedidos:', err);
        this.pedidos.set([]);
      }
    });
  }
}