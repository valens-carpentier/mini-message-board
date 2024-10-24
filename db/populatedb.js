const { Client } = require("pg");
require('dotenv').config();

const RESET_AND_POPULATE_DB = `
DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  message VARCHAR ( 255 )
);

INSERT INTO messages (username, message) 
VALUES
  ('Valens', 'Roi du Golf!'),
  ('Marine', 'Reine du Running!'),
  ('Martin', 'Roi du Rougail!');
`;

async function main() {
  console.log("Resetting and seeding database...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  
  try {
    await client.connect();
    await client.query(RESET_AND_POPULATE_DB);
    console.log("Database reset and seeded successfully");
  } catch (error) {
    console.error("Error resetting and seeding database:", error);
  } finally {
    await client.end();
  }
}

main();
