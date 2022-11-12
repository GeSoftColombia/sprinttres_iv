const authRouter = require("express").Router();
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcrypt");

authRouter.post("/login",(req,res) =>{
    ///const userLogin = userSchema(req.body);

    //Capturar los datos para la autenticación
    const username = req.body.username;
    const password = req.body.password;

    if(username == null || username == ""){
        var response = {
            code:500,
            message:"Nombre de usuario no válido...",
            data: null
        }
        res.json(response);
        
    }
    if(password == null || username == ""){
        var response = {
            code:500,
            message:"Contraseña no válida...",
            data: null
        }
        res.json(response);
        
    }

//Cargar el hash desde la base de datos

userSchema.findByEmail(username).then((data)=>{

    if(data.length <= 0){
        var response = {
            code:200,
            message:"Usuario no registrado...",
            data: data
        }
        res.json(response);
    }else{

        bcrypt.compare(password, data[0].password).then(function(result) {
            if(result){
                var response = {
                    code:200,
                    message:"Usuario autenticado exitosamente...",
                    data: data
                }
                res.json(response);

            }else{
                var response = {
                    code:200,
                    message:"Contraseña incorrecta...",
                    data: data
                }
                res.json(response);
            }
        });

    }
        
    }).catch((error) =>{
        var response = {
            code:500,
            message:"Server Error..." + error,
            data: error
        }
        res.json(response);
    })
   
})

module.exports = authRouter;