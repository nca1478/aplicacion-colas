
// Establecer comunicacion con el servidor
var socket = io();

// Referencia al label en el front
// Se mostrara el siguiente ticket
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
  console.log('Conectado al servidor');
})

socket.on('disconnect', function() {
  console.log('Se perdió la conexión con el servidor');
})

$(document).ready(function(){
  socket.on('estadoActual', function(resp){
    console.log(resp.actual);
    label.text(resp.actual);
  })
})

$('button').on('click', function(){
  socket.emit('siguienteTicket', null, function(siguienteTicket){
    console.log(siguienteTicket);
    label.text(siguienteTicket);
  });
})