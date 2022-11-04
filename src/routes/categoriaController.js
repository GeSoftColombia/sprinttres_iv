const express = require('express');
const categoriaSchema =require('../schemas/categoriaSchemas');

//Router
const categoriaRouter = express.Router()

//Retorna todas las categorías
categoriaRouter.get('/categoria/getall', (req, res)=>{
    categoriaSchema.find().then((data)=>{
        console.log("Consulta de categorías realizada exitosamente");
        res.json(data);
    }).catch((error) =>{
        console.log ("Error en la consulta" + error);
        res.json(error);
    })
})

//Crear una categoría
categoriaRouter.post('/categoria/create',(req,res) =>{
    const newCategoria = categoriaSchema(req.body);
    newCategoria.save().then((data) => {
        console.log("Categoría creada exitosamente");
        res.json(data)
    }).catch((error) => {
        console.log("Error en la creación de la Categoría" + error);
        res.json(error);
    })
    
})


module.exports = categoriaRouter;