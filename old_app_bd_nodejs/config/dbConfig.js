// config/dbConfig.js
// Usar mysql2/promise para operaciones async/await y un pool de conexiones
const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'test',
    database: 'empresa',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

async function testConnection() {
    try {
        const conn = await pool.getConnection();
        conn.release();
        console.log('Conexión exitosa a la base de datos (pool)');
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
}

// Ejecutar test de conexión en el arranque (no bloqueante)
testConnection();

// Exportamos un wrapper `query` que devuelve `rows` (resultado de la consulta)
module.exports = {
    query: async (sql, params) => {
        const [rows] = await pool.query(sql, params);
        return rows;
    },
    pool,
};
