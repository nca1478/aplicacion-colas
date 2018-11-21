// Importando socket
const { io } = require('../server');

// Importando clase TicketControl
const { TicketControl } = require('../classes/ticket-control');

// Instanciando clase TicketControl
const ticketControl = new TicketControl();

// Manejar eventos de conexión
io.on('connection', (client) => {
  client.on('siguienteTicket', (data, callback) => {
    let siguiente = ticketControl.siguiente();
    
    console.log(siguiente);

    callback(siguiente);
  })

  client.emit('estadoActual', {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimos4()
  });

  client.on('atenderTicket', (data, callback) => {
    if(!data.escritorio){
      return callback({
        err: true,
        mensaje: 'El escritorio es necesario'
      })
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio);

    callback(atenderTicket);

    client.broadcast.emit('ultimos4', {
      ultimos4: ticketControl.getUltimos4()
    })
    
  })

})