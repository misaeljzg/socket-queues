//HTML References

const lblDesk = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPendings');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('Desk is mandatory');
}

const desk = searchParams.get('desk');
lblDesk.innerText = desk;

divAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {

    btnAttend.disabled = false

});

socket.on('disconnect', () => {
    btnAttend.disabled = true;
});


socket.on('send-message', (payload) => {
    console.log( payload )
});

socket.on('pending-tickets', (pendingTickets) => {
    if (pendingTickets === 0) {
        lblPending.style.display = 'none';
        divAlert.style.display = '';
    } else {
        lblPending.style.display = '';
        divAlert.style.display = 'none';
        lblPending.innerHTML = pendingTickets;
    }
    
});

btnAttend.addEventListener( 'click', () => {

    socket.emit('attend-ticket', {desk}, ({ok ,ticket, msg}) => {
        if(!ok) {
            lblTicket.innerText = 'None';
            return divAlert.style.display = '';
        }

        lblTicket.innerText = 'Ticket ' + ticket.number;
    });
    
    // socket.emit( 'next-ticket', null, ( ticket ) => {
    //     lblNewTicket.innerText = ticket;
    // });

});
