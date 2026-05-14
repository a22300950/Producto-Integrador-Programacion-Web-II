export interface Pedido {
  id_pedido: number;
  productos: any[];
  total: number;
  fecha: Date;
  estatus: 'Pendiente' | 'Pagado' | 'Cancelado';
}
