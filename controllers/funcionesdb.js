var path = require('path');

 
const controller = {};
// paginas de bienvenida 
controller.bienvenida = (req,res) =>{    
    res.render('bienvenida', {data:''});
};

controller.ver_reg = (req,res) =>{
    res.render('reg', {data:''});
};

controller.add_reg = (req,res) =>{
    req.getConnection((err, conn) =>{        
        var user = req.body.usuario;        
        var sql ="SELECT * FROM usuarios WHERE usuario = ? ";        
        conn.query(sql,user, function (err, result, fields) {
            if (err) {
                console.log(command);
                console.log("ERROR");
                console.log(err);
                return;
            }
            //console.log(result);
            if (result.length == 0){                            
                if(req.body.cedula == "" && req.body.nombre == "" && req.body.celular == "" && req.body.correo == "" && req.body.usuario == "" && req.body.password  == "" && req.body.edad== "" && req.body.barrio == "" ){                 
                    console.log('hay valores vacios')
                    res.redirect('/reg'); 
                }else{ 
                        var sqlinsert ='INSERT INTO usuarios set ?';
                        conn.query(sqlinsert,req.body, function (err, result) {
                        if (err) {                        
                            console.log("ERROR");
                            console.log(err);
                            return;
                        }                        
                                            
                            if (result){
                                console.log('insercion exitosa');
                                res.redirect('/');
                            }else{                                                       
                                console.log('No se hizo la inserccion');
                                res.redirect('/reg');                             
                            }                        
                    });

                }                                                                           
                
            }else{
                console.log('usuario repetido ');
                res.redirect('/reg');                         
                

                
            }
                     
            
        });                                        
    });
    

};

// paginas de la libreria 
controller.val_user = (req,res) =>{ 
    req.getConnection((err, conn) =>{           
        var sql ="SELECT * FROM usuarios WHERE usuario = ? ";
        var user = req.body.id;

        conn.query(sql,user, function (err, result, fields) {
            if (err) {
                console.log(command);
                console.log("ERROR");
                console.log(err);
                return;
            }
            //console.log(result);
            if (result.length == 0){
                console.log('hay valores vacios');
                res.redirect('/');
                         
            }else{
                if (req.body.id == result[0].usuario && req.body.Nombre == result[0].password){
                    console.log('Bienvenido ' + result[0].usuario);
                    res.redirect('/inicio');
                }else{
                    console.log('Datos erroneos');
                }

                
            }
                     
            
        });                                        
    });
     
    
    //res.render('inicio', {data:''});
};

controller.inicio = (req,res) =>{    
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM books', (err, cons) =>{            
            res.render('inicio', {
                data: cons
            });            
        }); 
    });
    
};

controller.coleccion = (req,res) =>{   
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM books', (err, cons) =>{            
            res.render('coleccion', {
                data: cons
            });            
        }); 
    });
};

controller.libros = (req,res) =>{  
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM books', (err, cons) =>{
            
            res.render('libros', {
                data: cons

            });
            
        }); 
    });  
    
};
controller.reg_libros = (req,res) =>{    
    res.render('addlibros');
};
controller.add_libros = (req,res) =>{    
    req.getConnection((err, conn) =>{        
        if(req.body.titulo == "" && req.body.autor == "" && req.body.estado == "" && req.body.idioma == "" && req.body.disponible == "" && req.body.descricion  == "" && req.body.barrio== "" && req.body.propietario == "" ){                 
            console.log('hay valores vacios')
            res.redirect('/inicio/l/reg/'); 
        }else{ 
                var sqlinsert ='INSERT INTO books set ?';
                conn.query(sqlinsert,req.body, function (err, result) {
                if (err) {                        
                    console.log("ERROR");
                    console.log(err);
                    return;
                }                        
                                    
                    if (result){
                        console.log('insercion exitosa');
                        res.redirect('/inicio');
                    }else{                                                       
                        console.log('No se hizo la inserccion');
                        res.redirect('/inicio/l/reg/');                             
                    }                        
            });

        }                   

                
    });
                     
    
};

controller.recom = (req,res) =>{  
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM books', (err, cons) =>{
            
            res.render('recom', {
                data: cons

            });
            
        }); 
    });   
    
};




controller.add = (req,res) =>{
    req.getConnection((err, conn) =>{    
        conn.query("SELECT * FROM usuarios", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            console.log(req.body.id);
            res.redirect('/inicio/lib/index.html');
            
          });                    
     
    });
    
};

  controller.ver = (req, res) =>{
      console.log(res.params);
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM empleados', (err, cons) =>{
            console.log(cons.Id);
            res.render('verempleados', {
                data: cons

            });
        });
    });
};


module.exports = controller;