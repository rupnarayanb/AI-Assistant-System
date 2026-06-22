const db = require('./db');

async function test(){
   const result = await db.query('SELECT * FROM users');
   console.log(result);
}

test();
