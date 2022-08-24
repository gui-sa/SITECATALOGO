const mysql = require("mysql");


const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME,
});

//View Users
exports.view = (req,res)=>{
    //Connecting to Database (pool)
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
        
        //use the connection:
        connection.query('SELECT * FROM USERS', (err,rows)=>{
            connection.release();
            if(!err){
                res.render('home',{rows});
            }else{
                console.log(err);
            }
            //DEBUG - console.log('The data from USERS table: \n', rows);
        });
    });
} 

//find user by search
exports.find  = (req,res)=>{
    //Connecting to Database (pool)
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
        
        let searchTerm = req.body.search;

        //use the connection:
        connection.query('SELECT * FROM USERS WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?' , ['%' + searchTerm + '%' , '%' + searchTerm + '%', '%' + searchTerm + '%'] , (err,rows)=>{
            connection.release();
            if(!err){
                res.render('home',{rows});
            }else{
                console.log(err);
            }
            //DEBUG - console.log('The data from USERS table: \n', rows);
        });
    });

}

exports.form = (req,res)=>{
    res.render('add-user');
}

exports.create = (req,res)=>{
    const {first_name, last_name, email, phone, comments }= req.body;

    //Connecting to Database (pool)
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
        //use the connection:
        connection.query('INSERT INTO USERS SET first_name = ?, last_name =?, email =?, phone =?, comments =?', [first_name,last_name, email, phone, comments], (err,rows)=>{
            connection.release();
            if(!err){
                res.render('add-user', {alert: [first_name + ' added succesfully'] });
            }else{
                console.log(err);
            }
            //DEBUG - console.log('The data from USERS table: \n', rows);
        });
    });

}

exports.edit = (req,res)=>{
    //Connecting to Database (pool)
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
        
        //use the connection:
        connection.query('SELECT * FROM USERS WHERE users_id=?', [req.params.id], (err,rows)=>{
            connection.release();
            if(!err){
                res.render('edit-user',{rows});
            }else{
                console.log(err);
            }
            //DEBUG - console.log('The data from USERS table: \n', rows);
        });
    });
}

exports.update = (req,res)=>{

    const {first_name, last_name, email, phone, comments }= req.body;
    
    //Connecting to Database (pool)
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
        
        //use the connection:
        connection.query('UPDATE USERS SET first_name = ?, last_name =?, email = ?, phone = ?, comments = ? WHERE users_id = ?;', [first_name,last_name, email, phone, comments, req.params.id], (err,rows)=>{
            connection.release();
            if(!err){
                pool.getConnection((err,connection)=>{
                    if(err) throw err;
                    console.log('Connected as ID' + connection.threadId);
                    
                    //use the connection:
                    connection.query('SELECT * FROM USERS WHERE users_id=?', [req.params.id], (err,rows)=>{
                        connection.release();
                        if(!err){
                            res.render('edit-user',{rows, alert: [first_name + 'has been updated succesfully']});
                        }else{
                            console.log(err);
                        }
                        //DEBUG - console.log('The data from USERS table: \n', rows);
                    });
                });
            }else{
                console.log(err);
            }
            //DEBUG - console.log('The data from USERS table: \n', rows);
        });
    });
}

exports.delete = (req,res)=>{

    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
        //use the connection:
        connection.query('DELETE FROM USERS WHERE users_id =?', [req.params.id], (err,rows)=>{
            connection.release();
            if(!err){
                res.redirect('/');
            }else{
                console.log(err);
            }
            //DEBUG - console.log('The data from USERS table: \n', rows);
        });
    });

}

exports.viewall = (req,res)=>{
    //Connecting to Database (pool)
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log('Connected as ID' + connection.threadId);
        
        //use the connection:
        connection.query('SELECT * FROM USERS WHERE users_id = ?', [req.params.id], (err,rows)=>{
            connection.release();
            if(!err){
                res.render('view-user',{rows});
            }else{
                console.log(err);
            }
            //DEBUG - console.log('The data from USERS table: \n', rows);
        });
    });
} 