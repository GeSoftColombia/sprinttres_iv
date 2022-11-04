const express = require('express');
const mongoose = require ('mongoose');
const categoriaRouter = require('./routes/categoriaController');
require ('dotenv').config();

const app = express();

//Configuramos Express como Json Data
app.use(express.json());

//Ruta Inicial
app.get('/', (req, res)=> {
    res.send("Servidor funcionando...")
})

//Demás Rutas de los Controladores
app.use('/api', categoriaRouter);

//Conexión a la base de datos ATLAS - CLOUDING

mongoose.connect(process.env.databaseUrlCloud).then(()=>{
    console.log("Mongo DB Cloud connected... " );
}).catch((error)=>{
    console.log("database connect error: " + error)
})


//Conexión Local - Localhost
// mongoose.connect(process.env.databaseUrlLocal).then(()=>{
//     console.log("Mongo DB Local connected... " );
// }).catch((error)=>{
//     console.log("database connect error: " + error)
// })


app.listen(process.env.appPort,() => { 
    console.log("Server is listening...")
})