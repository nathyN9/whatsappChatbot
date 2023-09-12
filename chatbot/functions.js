const axios = require('axios');

async function getSaludo (client, message) {
    client
        .sendText(message.from, `Hola bienvenido a tu Asistente Virtual de Mundo Digital
            \n Para comenzar cuéntame, ¿cuál es tu nombre?` )
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
}

async function getMenu (client, message, padre) {


    const url=`http://localhost:3000/questions/${padre}`
    await axios({
        method: 'get',
        url: url
    })
    .then(data=>{
        var response="Hola. \nPor favor escoge alguna de las siguientes opciones\n";
        data.data.forEach (element => {
            if (element.padre==padre && element.pregunta!=null)
                response+=`${element.id}.  ${element.pregunta} \n`;
        })
        
            client.sendText(message.from, `${response}`);

    })
    .finally(data=>{
        return data;
    });
}



module.exports = {getSaludo, getMenu};