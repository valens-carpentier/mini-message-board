const pool = require('./pool');

async function viewDatabase() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM messages');
    console.log('Database contents:');
    console.log(result.rows);
    client.release();
  } catch (err) {
    console.error('Error executing query', err.stack);
  } finally {
    await pool.end();
  }
}

viewDatabase();
