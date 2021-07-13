const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const expressEjsLayouts = require('express-ejs-layouts')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000
//template  engine
app.use(expressLayouts)
app.set('view engine', 'ejs');


//Connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    // password    : process.env.DB_PASS,
    database    : process.env.DB_NAME  
})
// connection to DB
pool.getConnection((err, connection)=>{
    if(err) throw err; // not connected
    console.log('connected to ID' + connection.threadId);
})






//parsing
 app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())


//Static files
app.use(express.static('public'));




app.get('/about',(req,res) =>{
    res.render('about')
})

// app.get('', (req, res) => {
//   res.send('Hello World!')
// })

const routes = require('./server/routes/user')
app.use('/',routes)

//http://localhost/phpmyadmin





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})