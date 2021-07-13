const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit : 100,
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    // password    : process.env.DB_PASS,
    database    : process.env.DB_NAME  
})

// view users
exports.view = (req, res)=>{
// connection to DB
pool.getConnection((err, connection)=>{
    if(err) throw err; // not connected
    console.log('connected to ID' + connection.threadId);
    //User connection
    connection.query('SELECT* FROM students', (err,rows)=>{
        // When done with the connection, release it
        connection.release();
        if(!err){
            res.render('index',{ rows })
        } else{
            console.log(err);
        }
        // console.log('Data from first user table: \n', rows)
    })
})
}
// Find user by search
exports.find = (req,res) =>{
pool.getConnection((err, connection)=>{
    if(err) throw err; // not connected
    console.log('connected to ID' + connection.threadId);

    let searchTerm = req.body.search
    //User connection
    connection.query('SELECT * FROM students WHERE first_name LIKE ? OR last_name LIKE ?',['%'+ searchTerm + '%', '%'+ searchTerm + '%'], (err,rows)=>{
        // When done with the connection, release it
        connection.release();
        if(!err){
            res.render('index',{ rows })
        } else{
            console.log(err);
        }
        // console.log('Data from user table: \n', rows)
    })
})
}

exports.form = (req,res) =>{
    res.render('add-student');
}




//Add new user
exports.create = (req,res) =>{
    // res.render('add-student')
    const{first_name, last_name, email ,phone, comments} = req.body
    pool.getConnection((err, connection)=>{
    if(err) throw err; // not connected
    console.log('connected to ID2' + connection.threadId);

    let searchTerm = req.body.search
    //User connection
    connection.query('INSERT INTO students SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?',[first_name, last_name, email,phone,comments],(err,rows)=>{
        // When done with the connection, release it
        connection.release();
        if(!err){
            res.render('add-student')
        } else{
            console.log(err);
        }
        // console.log('Data from user table: \n' + 'Search done')
    })
})
}

exports.edit = (req, res) => {
    pool.getConnection((err, connection)=>{
    if(err) throw err; // not connected
    console.log('connected to ID' + connection.threadId);
    // let need =req.params.id
    let sql ='SELECT * FROM students WHERE id = 1' //need
    let query = connection.query(sql,(err, result) =>{
        if(err) throw err;
        res.render('edit-Students',{
            title : 'CRUD',
            row :  result[0]
        })
    })
    // let editTerm = req.body.id
  // User the connection
//    var edit = connection.query  ('SELECT * FROM students WHERE id = ? ', [req.params.id], (err, rows) => {
//     if (!err) {
//       res.render('edit-students', { rows });
//     } else {
//       console.log(err);
//     }
//     console.log('The data from edit user table: \n', rows);
//     console.log('Data form variable\n',edit)
//   });
})
}

// Delete users
exports.delete = (req,res) =>{
    // res.render('add-student')
    pool.getConnection((err, connection)=>{
    if(err) throw err; // not connected
    console.log('connected to ID2' + connection.threadId);

    //User connection
    connection.query('DELETE FROM students WHERE id = ? ',[req.params.id],(err,rows)=>{
        // When done with the connection, release it
        connection.release();
        if(!err){
            res.redirect('/')
        } else{
            console.log(err);
        }
        // console.log('Data from user table: \n' + 'Search done')
    })
})
}


// pool.getConnection((err,connection ) =>{
//     if(err) throw err;
//     connection.query('UPDATE students status = ? WHERE id = ?', ['removed', req.params.id], (err,rows)=>{
//         connection.release() // return connection pool
//         if(!err){
//             res.redirect('/');
//         } else{
//             console.log(err);
//         }
//         console.log('The data from unactive users: \n')
//     })
// })


//vie All Details

exports.viewAll = (req, res)=>{
// connection to DB
pool.getConnection((err, connection)=>{
    if(err) throw err; // not connected
    console.log('connected to ID' + connection.threadId);
    //User connection
    connection.query('SELECT * FROM students WHERE id = ?',[req.params.id], (err,rows)=>{
        // When done with the connection, release it
        connection.release();
        if(!err){
            res.render('view-students',{ rows })
        } else{
            console.log(err);
        }
        // console.log('Data from first user table: \n', rows)
    })
})
}