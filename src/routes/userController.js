const userRouter = require("express").Router();
const userSchema = require("../schemas/userSchema");
const bcrypt = require('bcrypt');

//Listar a todos los usuarios
userRouter.get("/user/getall",(req,res) => {
    userSchema.find().then((data)=>{
            var response = {
                code:200,
                message:"Consulta realizada exitosamente...",
                data: data
            }
            res.json(response);
        }).catch((error) => {
            var response = {
                code:500,
                message:"Server Error..." + error,
                data: error
            }
            res.json(response);
        })
    })

//Registrar un usuario
    userRouter.post('/user/create',(req,res) =>{

//Mapear el esquema recibido en el request con el esquema de MongoDB
    const newUser = userSchema(req.body);

//Validar que el correo NO exista en la BD
        userSchema.findByEmail(req.body.correo).then((data) =>{
            if(data.length > 0){
                var response = {
                    code:500,
                    message:"Correo previamente registrado en el Sistema...",
                    data: null
                }
                res.json(response);
            }else{
                //Encriptar el password
                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(newUser.password, salt, function(err, hash) {

                if(err)
                {
                    var response = {
                        code:500,
                        message:"Error al guardar el usuario...",
                        data: err
                    }
                    res.json(response);

                }
                else
                {   
                    newUser.password = hash;
                    newUser.save().then((data) => {
                        var response = {
                            code:200,
                            message:"Usuario registrado exitosamente...",
                            data: data
                        }
                        res.json(response);
                    }).catch((error) => {
                        var response = {
                            code:500,
                            message:"Server Error..." + error,
                            data: error
                        }
                        res.json(response);
                        })
                }
                });
                });
                        
            }
            }).catch((error) => {
                var response = {
                    code:500,
                    message:"Server Error..." + error,
                    data: error
                }
                res.json(response);
                })

})


module.exports = userRouter;
