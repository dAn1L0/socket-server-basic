// Servidor de express
const express = require('express')
const app = express()

// Servidor de socket
const server = require('http').createServer(app);

// COnfiguración del socket server
const io = require('socket.io')(server);

// Desplegar el directorio público
app.use(express.static(__dirname + '/public')); 

io.on('connection', () => { 
  console.log('cliente conectado');
});


server.listen(8080, () => {
  console.log('Server corriendo en el puerto 8080');
});