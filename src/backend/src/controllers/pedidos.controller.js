import db from '../config/db.js';

export const crearPedido = (req, res) => {
  const { productos, total, paypal_order_id } = req.body;
  if (!productos || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: 'No hay productos en el pedido' });
  }
  if (!total || Number(total) <= 0) {
    return res.status(400).json({ error: 'Total inválido' });
  }

  db.beginTransaction(err => {
    if (err) return res.status(500).json({ error: 'Error al iniciar transacción' });

    db.query(
      'INSERT INTO pedidos (total, estatus, paypal_order_id) VALUES (?, ?, ?)',
      [total, 'Pendiente', paypal_order_id || null],
      (err, result) => {
        if (err) {
          return db.rollback(() => res.status(500).json({ error: 'Error al guardar pedido', details: err.message }));
        }
        const id_pedido = result.insertId;
        const detalles = productos.map(p => [id_pedido, p.id, p.cantidad || 1, p.price]);
        db.query(
          'INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES ?',
          [detalles],
          (err) => {
            if (err) {
              return db.rollback(() => res.status(500).json({ error: 'Error al guardar detalle', details: err.message }));
            }
            db.commit(err => {
              if (err) {
                return db.rollback(() => res.status(500).json({ error: 'Error al finalizar transacción', details: err.message }));
              }
              res.status(201).json({ id_pedido });
            });
          }
        );
      }
    );
  });
};
