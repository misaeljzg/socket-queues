const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();


const socketController = (socket) => {

    //New client connectw
    socket.emit('last-ticket', ticketControl.lastTicket);
    socket.emit('current-status', ticketControl.lastFourTickets);
    socket.emit('pending-tickets', ticketControl.tickets.length);

    socket.on('next-ticket', (payload, callback) => {

        const next = ticketControl.nextTicket();
        callback(next);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

    });

    socket.on('attend-ticket', ({ desk }, callback) => {
        if (!desk) {
            return callback({
                ok: false,
                msg: 'Desk is needed'
            });
        }

        const ticket = ticketControl.attendTicket(desk);

        //Notify changes in last 4
        socket.broadcast.emit('current-status', ticketControl.lastFourTickets);
        socket.emit('pending-tickets', ticketControl.tickets.length);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'No pending tickets'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    });

}



module.exports = {
    socketController
}

