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

    constructor(private ticketService: TicketService) {}

    ngOnInit() {
        this.getTickets();
    }

    getTickets() {
        this.ticketService
            .getTickets()
            .subscribe(
                tickets => this.tickets = tickets,
                error => this.errorMessage = <any>error
            );
    }

}