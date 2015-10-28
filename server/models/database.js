var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/crud-monkey';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE monkeys(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, talent VARCHAR(40) not null, funny BOOLEAN)');
query.on('end', function() { client.end(); });
