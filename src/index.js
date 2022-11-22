const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');
const path = require('path');
const categoriaRouter = require('./routes/categoriaController');
const productoRouter = require('./routes/productoController');
const userRouter = require('./routes/userController');
const authRouter = require('./routes/authController');
const tokenvalidation = require('./middleware/auth');
const { env } = require('process');

require ('dotenv').config();

const app = express();
app.use(cors());
//Configuramos Express como Json Data
app.use(express.json());
//Ruta Inicial
app.get('/', tokenvalidation, (req, res)=> {
    res.send("Servidor funcionando version..." + process.env.VERSION);
})
//Demás Rutas de los Controladores
app.use('/api',authRouter);
app.use('/api',tokenvalidation,categoriaRouter);
app.use('/api',tokenvalidation,productoRouter);
app.use('/api',tokenvalidation,userRouter);


//Configuramos la carpeta pública del servidor
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')))

//Conexión a la base de datos ATLAS - CLOUDING
// mongoose.connect(process.env.databaseUrlCloud).then(()=>{
//     console.log("Mongo DB Cloud connected... " );
// }).catch((error)=>{
//     console.log("database connect error: " + error)
// })

//Conexión Local - Localhost
mongoose.connect(process.env.databaseUrlLocal).then(()=>{
    console.log("Mongo DB Local connected... " );
}).catch((error)=>{
    console.log("database connect error: " + error)
})


app.listen(process.env.appPort,() => { 
    console.log("Server is listening...")
})