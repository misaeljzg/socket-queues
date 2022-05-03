const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(number, desk) {
        this.number = number;
        this.desk = desk;
    }
}

class TicketControl {
    constructor() {
        this.lastTicket = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFourTickets = [];

        this.init();
    }

    get toJson() {
        return {
            "lastTicket": this.lastTicket,
            "today": this.today,
            "tickets": this.tickets,
            "lastFourTickets": this.lastFourTickets
        }
    }

    init () {
        const {today, tickets, lastTicket, lastFourTickets} = require('../db/data.json');
        if(today === this.today) {
            this.tickets = tickets;
            this.lastTicket = lastTicket;
            this.lastFourTickets = lastFourTickets;
        } else {
            // It is another day
            this.saveDB();
        }
    }

    saveDB () {
        const dbPath = path.join(__dirname, '../db/data.json');

        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));

    }

    nextTicket() {
        this.lastTicket += 1;
        this.tickets.push(new Ticket(this.lastTicket, null));

        this.saveDB();

        return 'Ticket ' + this.lastTicket;
    }

    attendTicket(desk) {
        //No tickets left
        if(this.tickets.length === 0) {
            return null;
        }
        
        const ticket = this.tickets.shift();
        ticket.desk = desk;

        this.lastFourTickets.unshift( ticket );

        if(this.lastFourTickets.length > 4) {
            this.lastFourTickets.splice(-1, 1);
        }

        this.saveDB();

        return ticket;

    }

    
}

module.exports = TicketControl;