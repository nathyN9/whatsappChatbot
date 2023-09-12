const express = require('express');
const conexion =require('./config/conexion')
const routers = require('./router/index')
const cors = require('cors')

const app = express()
const port = 3300

app.set('port', port)
app.use(cors());
app.use(express.json())

routers(app)

app.listen(app.get('port'), (error)=>{
    if (error) {
        console.log(error)
    } else {
        console.log('Servidor...', port)
    }
})