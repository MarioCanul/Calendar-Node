const express =require('express');
const { dbConnection } = require('./database/config');
const cors=require('cors')
require('dotenv').config()
const app= express();
// coneccion a db
dbConnection();
// cors
app.use(cors())
// ruta static
app.use(express.static('public'))
// lectura y parseo del body
app.use(express.json())
// rutas
app.use('/api/Auth',require('./routes/Auth'));
app.use('/api/Calendar',require('./routes/events'));

app.listen(process.env.PORT,()=>{
    console.log('Server Escuchando')
})