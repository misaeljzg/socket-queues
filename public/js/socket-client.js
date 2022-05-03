
// Referencias del HTML
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend  = document.querySelector('#btnSend');


const socket = io();



socket.on('connect', () => {
    // console.log('Connected');

    lblOffline.style.display = 'none';
    lblOnline.style.display  = '';

});

socket.on('disconnect', () => {
    // console.log('Disconnected from server');

    lblOnline.style.display  = 'none';
    lblOffline.style.display = '';
});


socket.on('send-message', (payload) => {
    console.log( payload )
})


btnSend.addEventListener( 'click', () => {

    const message = txtMessage
.value;
    const payload = {
        message,
        id: '123ABC',
        date: new Date().getTime()
    }
    
    socket.emit( 'send-message', payload, ( id ) => {
        console.log('From the server', id );
    });

});