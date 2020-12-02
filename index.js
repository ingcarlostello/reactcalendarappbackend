const express = require('express');
const { dbConnection } = require('./database/config');
const app = express()
require('dotenv').config();
const cors = require('cors');

//************************************************************************************************************************************ */
                                                        //* Conexion a la BD
//************************************************************************************************************************************ */
dbConnection();

//************************************************************************************************************************************ */
                                                        //* Cors
//************************************************************************************************************************************ */
app.use(cors())


// carpeta public
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

//************************************************************************************************************************************ */
                                                        //* Rutas
//************************************************************************************************************************************ */
//* ------------ rutas de autenticacion --------------
app.use('/api/auth', require('./routes/auth'))

app.use('/api/events', require('./routes/events'))





app.listen(process.env.PORT, () => {
  console.log(`Example app listening at ${process.env.PORT}`)
})