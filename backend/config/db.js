// config/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user:"postgres",
  password:'weeding123',
  host:"localhost",
  port: 5434,
  database:"weeding_card"
});

// const createTblQry=`Create Table Login(
//     email   VARCHAR(50) NOT NULL,
//     password VARCHAR(40) UNIQUE NOT NULL
// );`

// pool
// .query(createTblQry)
// .then((Response)=>{
//     console.log("Table Created");
//     console.log(response);
// })
// .catch((err)=>{
//     console.log(err);
// });

module.exports = pool;
