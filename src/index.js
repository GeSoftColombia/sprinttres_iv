const express = require('express');
const cors = require('cors');
const mongoose = require ('mongoose');
const path = require('path');
const categoriaRouter = require('./routes/categoriaController');
const productoRouter = require('./routes/productoController');
const userRouter = require('./routes/userController');
const authRouter = require('./routes/authController');

require ('dotenv').config();

const app = express();
app.use(cors());
//Configuramos Express como Json Data
app.use(express.json());
//Ruta Inicial
app.get('/', (req, res)=> {
    res.send("Servidor funcionando...")
})
//Demás Rutas de los Controladores
app.use('/api',categoriaRouter);
app.use('/api',productoRouter);
app.use('/api',userRouter);
app.use('/api',authRouter);

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