"use strict"

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(express.static('client'));

app.get('/hola-mundo',function(req,res){
    res.status(200).send("conexion establecida");
});

var messages = [{
    id:1,
    text:'Bienvenido al chat privado de socket.io y nodejs de osky',
    nickname:'Bot - Oscar'
}];

io.on('connection', function(socket){
    console.log("el nodo con IP:"+socket.handshake.address+"se ha conectado...");


    ///emite los mensajes
    socket.emit('messages',messages);

    //recoge cada mensaje y los va pusheando a el array
    socket.on('add-message',function(data){
        messages.push(data);

        //emite los mensajes a todos los usuarios
        io.sockets.emit('messages',messages);
    });
});

 //conexion al servidor por el puerto que querramos
server.listen(6677, function(){
    console.log("servidor esta funcionando en puerto 6677");
});
