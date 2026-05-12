import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/pedidos';

  agregarPedido(productos: any[], total: number, paypal_order_id?: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      productos,
      total,
      paypal_order_id: paypal_order_id || null
    });
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }
}
