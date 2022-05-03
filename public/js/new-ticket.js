//HTML References
const lblNewTicket = document.querySelector('#lblNewTicket');

const btnCreate = document.querySelector('button');

const socket = io();

socket.on('connect', () => {

    btnCreate.disabled = false

});

socket.on('disconnect', () => {
    btnCreate.disabled = true;
});


socket.on('send-message', (payload) => {
    console.log( payload )
});

socket.on('last-ticket', (ticket) => {
    lblNewTicket.innerHTML = 'Ticket ' + ticket;
});

btnCreate.addEventListener( 'click', () => {
    
    socket.emit( 'next-ticket', null, ( ticket ) => {
        lblNewTicket.innerText = ticket;
    });

});

