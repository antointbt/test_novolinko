import { Component, OnInit } from '@angular/core';
import { Ticket, TicketService } from '../ticket.service';
import 'rxjs/Rx';

@Component({
    selector: 'app-ticket-list',
    templateUrl: './ticket-list.component.html',
    styleUrls: ['./ticket-list.component.scss']
})

export class TicketListComponent implements OnInit {

    tickets: Ticket[];
    errorMessage: string;
    isLoading: boolean = true;
    headElements = ['Id', 'Libelle', 'Description', 'email', 'category', 'priority', 'Creation Date', 'Status'];

    constructor(private ticketService: TicketService) {}

    ngOnInit() {
      this.getTickets();
    }

    getTickets() {
      this.ticketService
          .getTickets()
          .subscribe(
              tickets => {
                  this.tickets = tickets;
                  this.isLoading = false;
              },
              error => this.errorMessage = <any>error
          );
    }


    findTicket(id): Ticket {
      return this.tickets.find(ticket => ticket.id === id);
    }
    

    appendTicket(ticket: Ticket) {
      this.tickets.push(ticket);
    }


    removeTicket(id) {
      let ticket = this.findTicket(id);
      this.ticketService
          .removeTicket(id)
          .subscribe(
              response => {
                this.getTickets();
              },
              error => {
                  this.errorMessage = <any>error;
              }
          );
    }
}
