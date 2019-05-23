import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { Ticket, TicketService } from '../ticket.service';
import 'rxjs/Rx';

@Component({
    selector: 'app-ticket-form',
    templateUrl: './ticket-form.component.html',
    styleUrls: ['./ticket-form.component.scss']
})

export class TicketFormComponent implements OnInit {

    errors: string = '';
    isLoading: boolean = false;

    constructor(private ticketService: TicketService) { }

    @Output()
    ticketAdded: EventEmitter<Ticket> = new EventEmitter<Ticket>();

    ngOnInit() {
    }

    addTicket(title) {
        this.isLoading = true;
        this.ticketService
            .addTicket({
                title: title
            })
            .subscribe(
                ticket => {
                    this.isLoading = false;
                    this.ticketAdded.emit(ticket);
                },
                error => {
                    this.errors = error.json().errors;
                    this.isLoading = false;
                }
            );
    }

}