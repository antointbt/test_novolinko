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
    public chart1Type:string = 'bar';
    public chartType = 'line';
    public chartDatasets: Array<any>;

    public chartLabels: Array<any> = ['Open Ticket', 'Processing Ticket', 'Urgent Priority', 'Hight Priority'];
  
    constructor(private ticketService: TicketService) {}

    ngOnInit() {
      this.getTickets();
      this.getStatsTickets();
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

    getStatsTickets() {
      this.ticketService
          .getStatsTickets()
          .subscribe(
              statstickets => {
                this.chartDatasets = JSON.parse('[{ "data":'+ JSON.stringify(statstickets)+', "label": "#nb"}]');
                this.isLoading = false;
              },
              error => this.errorMessage = <any>error
          );
    }

    findTicket(id): Ticket {
      return this.tickets.find(ticket => ticket.id === id);
    }
    
    isUpdating(id): boolean {
        return this.findTicket(id).isUpdating;
    }

    appendTicket(ticket: Ticket) {
      this.tickets.push(ticket);
    }

    processTicket(id) {
      let ticket = this.findTicket(id);
      ticket.isUpdating = true;
      this.ticketService
          .processTicket(id)
          .subscribe(
              response => {
                  ticket.status = response.status;
                  ticket.isUpdating = false;
                  this.getStatsTickets();
              },
              error => {
                  this.errorMessage = <any>error;
                  ticket.isUpdating = false;
              }
          );
    }

    closeTicket(id) {
      let ticket = this.findTicket(id);
      ticket.isUpdating = true;
      this.ticketService
          .closeTicket(id)
          .subscribe(
              response => {
                ticket.status = response.status;
                ticket.isUpdating = false;
                this.getStatsTickets();
              },
              error => {
                  this.errorMessage = <any>error;
                  ticket.isUpdating = false;
              }
          );
    }

    removeTicket(id) {
      let ticket = this.findTicket(id);
      ticket.isUpdating = true;
      this.ticketService
          .removeTicket(id)
          .subscribe(
              response => {
                this.getTickets();
                ticket.isUpdating = false;
              },
              error => {
                  this.errorMessage = <any>error;
                  ticket.isUpdating = false;
              }
          );
    }
}
