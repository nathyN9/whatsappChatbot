// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const axios = require('axios');

venom
  .create({
    session: 'session-name' //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

  function start(client) {
    client.onMessage((message) => {
      if (message.body === 'Hi' && message.isGroupMsg === false) {
        axios({
            method: 'get',
            url: 'http://localhost:3000/questions'
        })
        .then(data=>{
            var menu="";
            for (i=0; i<10; i++) {
                if (data.data[i].pregunta!=null)
                menu+=`\n ${i+1}. ${data.data[i].pregunta}`;
            }
           
            client.sendText(message.from, `Hola \n ${menu}`);
            
        })
        .then(err=>console.log(err));
       
        client
            .sendText(message.from, 'Resultado')
            .then((result) => {
                //console.log('Result:' , result); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
      }
    });
  }
