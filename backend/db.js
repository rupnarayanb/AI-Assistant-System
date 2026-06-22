const {Pool} = require('pg');


const pool = new Pool({
    user:'rupnarayan',
    password:'',
    host:'localhost',
    port:5432,
    database:'ai_assistant'

})

module.exports ={
    query:(text,params)=>pool.query(text,params)
}