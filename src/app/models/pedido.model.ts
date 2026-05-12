export interface Pedido {
  id: number;
  productos: any[];
  total: number;
  fecha: Date;
  estatus: 'Pendiente' | 'Pagado' | 'Cancelado';
}
