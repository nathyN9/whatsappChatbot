const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_chatbot_wp'
});

conexion.connect((error)=>{
    if (error) {
        console.error(error)
    } else {
        console.log('Conection success ...')
    }
});
module.exports = conexion