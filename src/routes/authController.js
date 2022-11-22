const authRouter = require("express").Router();
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require ('jsonwebtoken');

//Autenticación del usuario
authRouter.post("/login", async (req,res) =>{

    //Capturar los datos para la autenticación
    const username = req.body.username;
    const password = req.body.password;

    //Validar información
    if(username == null || username == ""){
        var response = {
            code:500,
            message:"Nombre de usuario no válido...",
            data: null
        }
        res.json(response);
        return;   
    }

    if(password == null || password == ""){
        var response = {
            code:500,
            message:"Contraseña no válida...",
            data: null
        }
        res.json(response);
        return;
    }

//Cargar el hash desde la base de datos
await userSchema.findByEmail(username).then((data)=>{

    if(data.length <= 0){
        var response = {
            code:500,
            message:"Usuario no registrado...",
            data: data
        }
        res.json(response);
    }else{
        bcrypt.compare(password, data[0].password).then(function(result) {
            if(result){
                //Generar token para peticiones
                const token = jwt.sign(
                    { 
                        id: data.compare__id
                    },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn:"2h",
                    }
                );
                var response = {
                    code:200,
                    message:"Usuario autenticado exitosamente...",
                    data:{
                        nombres:data[0].nombres,
                        apellidos:data[0].apellidos,
                        correo:data[0].correo,
                        token:token
                    }
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