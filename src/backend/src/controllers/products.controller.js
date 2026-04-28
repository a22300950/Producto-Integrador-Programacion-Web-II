import db from '../config/db.js';

const getProductos = (req, res) => {
    const sql = `SELECT
        id,
        name,
        price,
        imageUrl,
        category,
        description,
        inStock
    FROM productos`;
    db.query(sql, (error, resultados) => {
        if (error)
            return res.status(500).json({ error: 'Error al obtener los productos' });
        res.json(resultados);
    });
};

export { getProductos };