/* 
Chatbot básico para Whatsapp. Desarrollado en javascript, inicialmente es monosesión,
pero para la versión 2.0 se espera añadir las siguientes funcionalidades:

1. Multisesión
2. Consultar el usuario en la BD de usuarios
3. Guardar en base de datos las interacciones
4. Manejo de archivos, preguntas modo dropdown o selección única


Importamos 
 venom => Cliente de Whatsapp que crea un navegador virtual que simula ser web messenger
 Axios: Para consumir la api rest
 Functions: Para consumir las funciones básicas del chatbot
*/
const venom = require('venom-bot');
const axios = require('axios');
const functions = require('./functions');

// Declaración de variables que usará el chatbot

  var name=null, 
      id, 
      email, 
      phone, 
      isSessionActive=false, 
      padre=0,
      isChattingWithAnAgent=false,
      userPhone=null,
      currentPhone,
      indices=[],
      response="",
      chatbotTimeOut;

  // Instanciamos venom y creamos un cliente de web whatsapp 

    venom
    .create({
      session: 'session-name' //name of session
    })
    .then((client) => start(client))
    .catch((erro) => {
      console.log(erro);
    });

    // Iniciamos el cliente
    
    async function start(client) {
      // El cliente funciona escuchando los mensajes que se envían desde el euqipo que hace la interacción
      await client.onMessage((message) => {
        mensaje = message.body;
        mensaje=mensaje.toUpperCase();
        currentPhone=message.from;
        
        // Condicionales que controlan el flujo de la conversación

        if (message.body === 'Empezar' && message.isGroupMsg === false && isSessionActive==false && name==null && userPhone==null) {
          // Temporizador del chatbot. El tiempo máximo de chat es de 30 minutos
          
          chatbotTimeOut = setTimeout(() => {
            client.sendText(message.from, `Has excedido el tiempo de espera\nTu sesión ha finalizado. Gracias por usar nuestros servicios.`); 
            isSessionActive=false;
            isChattingWithAnAgent=false;
            name=null;
            id=null;
            email=null;
            phone=null;
            padre=0;
            userPhone=null;
            currentPhone=null;
          }, 1800000);
          functions.getSaludo(client, message);
          userPhone=message.from;
          isSessionActive = true;
        } else
        if (isSessionActive==true && name==null && message.isGroupMsg === false && currentPhone==userPhone) {
          name=message.body;
          client.sendText(message.from, `Hola ${name}, tu sesión ha iniciado con el id 1\n¿Cuál es tu identificación sin comas ni letras?`);
        } else if (isSessionActive==true && name!=null && id==null && message.isGroupMsg === false && currentPhone==userPhone){
          id=message.body;
          if(isNaN(id)){
              client.sendText(message.from, `Identificación no válida, ingresa tu identificación sin comas ni letras`);
              id=null;
          }
          else 
              client.sendText(message.from, `Muy bien ¿Cuál es tu correo electrónico?`);
        }
        else if (isSessionActive==true && name!=null && id!=null && email==null && message.isGroupMsg === false && currentPhone==userPhone)
          {
              email=message.body;
              if (esCorreoElectronico(email)){
                  client.sendText(message.from, `Súper. Para finalizar bríndanos un número de contacto por si se cierra la sesión te podamos contactar`);
              }
              else {
                  client.sendText(message.from, `Correo electrónico no válido. Ingresa un correo con el formato usuario@dominio.com`);
                  email=null;
              }
          }
        else if (isSessionActive==true && name!=null && id!=null && email!=null && phone==null && message.isGroupMsg === false && currentPhone==userPhone){
          phone=message.body;
          phoneString = phone.toString();
          if (isNaN(phone) || phoneString.length!=10){
              client.sendText(message.from, `El número ingresado no es válido. Ingresa un número de 10 dígitos para continuar`);    
              phone=null;
          }
          else{

            // Se consume la API que contiene el árbol de preguntas por primera vez

            const url=`http://localhost:3000/questions/${padre}`
            axios({
              method: 'get',
              url: url
            })
            .then(data=>{
              data.data.forEach (element => {
                if(element.pregunta!=null)
                  indices.push(element.id);
                if (element.padre==padre && element.pregunta!=null)
                  response+=`${element.id}.  ${element.pregunta} \n`;
                })
              client.sendText(message.from, `Por favor selecciona una opción de la lista\n\n${response}`);
            })
          }
        }
        else if (isSessionActive==true && name!=null && id!=null && email!=null && phone!=null && message.isGroupMsg === false && currentPhone==userPhone) {
          padre=message.body;
          isAValidOption = false;

          indices.forEach(element=>{
            console.log("element " + element);
            console.log("padre " + padre);
            if (element==padre)
              isAValidOption=true;
          })

          if (!isAValidOption)
          {
            client.sendText(message.from, `Selecciona una opción válida`);
          }
          else {

            // Se consume el árbol de preguntas a partir del segundo nivel y hasta que llegue al último nivel
            // Que implica transferir a un asesor.
            indices=[];
            const url=`http://localhost:3000/questions/${padre}`
            axios({
            method: 'get',
            url: url
            })
            .then(data=>{
              response="Por favor escoge alguna de las siguientes opciones\n\n";
              data.data.forEach (element => {
                
              if (element.padre==padre && element.pregunta!=null){
                  response+=`${element.id}.  ${element.pregunta} \n`;
                  indices.push(element.id);
              }
              })
              if (response=="Por favor escoge alguna de las siguientes opciones\n\n")
                throw "No hay data";
              client.sendText(message.from, `${response}`) ;
            })
            .catch(()=>{
              if (isNaN(padre)){
                //client.sendText(message.from, `Opción inválida, por favor selecciona una opción de la lista`);    
                isSessionActive=true;
              }
              else {
                //console.log("Indices: " + indices);
                client.sendText(message.from, `Serás transferido con un asesor, el tiempo de espera es de 5 segundos`);
                client.sendText(message.from, `En cualquier momento digita "salir" para terminar`);
                setTimeout(() => {
                  client.sendText(message.from, `Hola, te atiende ***ASESOR***, cuéntame, ¿en qué te puedo asesorar el día de hoy?`);  
                }, 5000);
                isChattingWithAnAgent=true;  
                isSessionActive=null;
              }
            });
          }
        }
        else if (mensaje=='SALIR' && message.isGroupMsg === false && currentPhone==userPhone){
          client.sendText(message.from, `Tu sesión ha finalizado. Gracias por usar nuestros servicios.`);    
          isSessionActive=false;
          isChattingWithAnAgent=false;
          name=null;
          id=null;
          email=null;
          phone=null;
          padre=0;
          userPhone=null;
          currentPhone=null;
          clearTimeout(chatbotTimeOut);
        }
      });
    }

const esCorreoElectronico = correoElectronico => /\S+@\S+/.test(correoElectronico);