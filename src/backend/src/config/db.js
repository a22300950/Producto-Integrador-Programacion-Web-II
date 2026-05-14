import mysql from 'mysql2';
import 'dotenv/config';

const conexion = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    database: process.env.DB_NAME || 'refaccionaria',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
});

conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar:', error);
        return;
    }
    console.log('Conexión exitosa');
});

export default conexion;