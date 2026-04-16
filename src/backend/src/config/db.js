const mysql = require('mysql2');
require('dotenv').config({ path: '../../.env' });

const conexion =  mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306
});

conexion.connect((error)=>{
    if(error){
        console.error('Error al conectar:', error);
        return;
    }
    console.log('Conexión exitosa');
});

module.exports = conexion;