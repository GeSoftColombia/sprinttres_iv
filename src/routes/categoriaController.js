const express = require('express');
const categoriaSchema = require('../schemas/categoriaSchema');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

//Router
const categoriaRouter = express.Router();

//Retornar todas las categorías
// categoriaRouter.get('/categoria/getall',async (req,res) => {
//     console.log("categorias getall");
//     categoriaSchema.find().then((data)=>{
//         //console.log(data);
//         var response = {
//             code:200,
//             message:"Consulta realizada exitosamente...",
//             data: data
//         }
//         res.json(response);
//     }).catch((error) => {
//         //console.log(error);
//         var response = {
//             code:500,
//             message:"Server Error..." + error,
//             data: error
//         }
//         res.json(response);
//     })
// })

//Retornar todas las categorías por nombre
categoriaRouter.get('/categoria/getbyname/:name', (req, res)=>{
    categoriaSchema.findByName(req.params.name).then((data)=>{
        var response = {
            code:200,
            message:"Consulta realizada exitosamente...",
            data: data
        }
        res.json(response);
    }).catch((error) =>{
        var response = {
            code:500,
            message:"Server Error..." + error,
            data: error
        }
        res.json(response);
    })
})

//Crear una categoría
categoriaRouter.post('/categoria/create',(req,res) =>{

    //Mapear el esquema recibido en el request con el esquema de MongoDB
    const newCategoria = categoriaSchema(req.body);
    
    //Tomar los datos del base64
    const fileContents = new Buffer.from(newCategoria.imagen.data, 'base64')
    //Guardar el archivo en una ruta dada
    fs.writeFileSync(path.join(__dirname, '..', '..', 'public/images/') + newCategoria.imagen.name, fileContents, err => {
        if (err) {
            console.error(err);
        }
    });

    //Limpiar la data del base 64
    newCategoria.imagen.data = "";
    newCategoria.imagen.url = process.env.pathfiles + newCategoria.imagen.name;
    
    newCategoria.save().then((data) => {

        var response = {
            code:200,
            message:"Categoria creada exitosamente...",
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


module.exports = categoriaRouter;