import { Component, inject, OnInit, signal } from '@angular/core';
// 1. Asegúrate de importar CommonModule
import { CommonModule } from '@angular/common'; 
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-facturacion',
  standalone: true,
  // 2. Agrega CommonModule aquí para que el HTML reconozca | date y | currency
  imports: [CommonModule], 
  templateUrl: './facturacion.html',
  styleUrls: ['./facturacion.css']
})
export class FacturacionComponent implements OnInit {
  private pedidoService = inject(PedidoService);
  
  pedidos = signal<any[]>([]);
  pedidoSeleccionado = signal<any>(null);
  uuid = signal<string>('');

  ngOnInit() {
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        // Asegúrate de que los datos de la base de datos SQL se guarden correctamente
        this.pedidos.set(Array.isArray(data) ? data : []);
      },
      error: (err) => console.error('Error al cargar pedidos:', err)
    });
  }

  prepararFactura(pedido: any) {
    this.pedidoSeleccionado.set(pedido);
    this.uuid.set(crypto.randomUUID().toUpperCase());
    
    // Esperamos a que el DOM se actualice antes de imprimir
    setTimeout(() => {
      window.print();
    }, 800);
  }
}