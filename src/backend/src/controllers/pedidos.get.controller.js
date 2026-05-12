import db from '../config/db.js';

export const obtenerPedidos = (req, res) => {
  const sql = `SELECT p.id_pedido, p.fecha, p.total, p.estatus, p.paypal_order_id,
    dp.id_producto, dp.cantidad, dp.precio_unitario,
    pr.name, pr.imageUrl
  FROM pedidos p
  JOIN detalle_pedido dp ON p.id_pedido = dp.id_pedido
  JOIN productos pr ON dp.id_producto = pr.id
  ORDER BY p.id_pedido DESC`;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener pedidos', details: err.message });
    // Agrupar por pedido
    const pedidos = {};
    for (const row of rows) {
      if (!pedidos[row.id_pedido]) {
        pedidos[row.id_pedido] = {
          id: row.id_pedido,
          fecha: row.fecha,
          total: row.total,
          estatus: row.estatus,
          paypal_order_id: row.paypal_order_id,
          productos: []
        };
      }
      pedidos[row.id_pedido].productos.push({
        id: row.id_producto,
        name: row.name,
        imageUrl: row.imageUrl,
        cantidad: row.cantidad,
        precio_unitario: row.precio_unitario
      });
    }
    res.json(Object.values(pedidos));
  });
};
