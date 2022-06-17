const BandList = require('./band-list');



class Sockets {

  constructor(io){

    this.io = io;

    this.bandList = new BandList();

    this.socketEvents();

  }

  socketEvents(){

    this.io.on('connection', (socket) => {

      console.log('cliente conectado');

      //? Emitir todas las bandas registradas.
      socket.emit('list-bands', this.bandList.getBands())

      //? Votar por la banda
      socket.on('vote-band', (id) => {
        this.bandList.addVotesToBand(id)
        this.io.emit('list-bands', this.bandList.getBands())
      })

      //? Borrar por la banda
      socket.on('remove-band', (id) => {
        this.bandList.removeBand(id)
        this.io.emit('list-bands', this.bandList.getBands())
      })

      socket.on('change-name-band', ({id,name}) => {
        this.bandList.editBandName(id,name)
        this.io.emit('list-bands', this.bandList.getBands())
      })

      socket.on('new-band', ({name}) => {
        this.bandList.addBand(name)
        this.io.emit('list-bands', this.bandList.getBands())
      })




    })
  }

}

module.exports = Sockets