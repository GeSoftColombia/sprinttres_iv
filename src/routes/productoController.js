const express = require('express');
const productoSchema = require('../schemas/productoSchema');

//Router
const productoRouter = express.Router();

//Retornar todos los productos
productoRouter.get('/producto/getall',(req,res) => {
    productoSchema.find().then((data)=>{
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

//Registrar un producto
productoRouter.post('/producto/create',(req,res) =>{

    //Mapear el esquema recibido en el request con el esquema de MongoDB
    const newProducto = productoSchema(req.body);
    
    newProducto.save().then((data) => {

        var response = {
            code:200,
            message:"Producto registrado exitosamente...",
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

module.exports = productoRouter;