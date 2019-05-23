import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { OnChange } from 'angular-bootstrap-md/lib/utils/decorators';

export interface Ticket {
    id: Number,
    libelle: String,
    description: String,
    status: string,
    email: String,
    creationDate: String,
    priority: String,
    category: String,
    isUpdating: boolean
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

    private accessToken;
    private headers;

    constructor(private http: Http) {
    }

    getTickets(): Observable<Ticket[]> {
      return this.http.get(API_URL + '/tickets',
          new RequestOptions({ headers: this.headers })
      )
      .map(res => {
          let modifiedResult = res.json();
          modifiedResult = modifiedResult.map(function(ticket) {
              ticket.isUpdating = false;
              return ticket;
          });
          return modifiedResult;
      });
    }

    getStatsTickets(): Observable<Ticket[]> {
      return this.http.get(API_URL + '/getStatsTickets',
        new RequestOptions({ headers: this.headers })
      )
      .map(res => {
          let modifiedResult = res.json();
          return modifiedResult;
      });
    }

    addTicket(ticket): Observable<Ticket> {
      return this.http.post(API_URL + '/tickets', ticket, 
          new RequestOptions({ headers: this.headers })
      ).map(res => res.json());
    }

    closeTicket(id): Observable<Ticket> {
      return this.http.post(API_URL + '/closeTicket/' + id + '/close', {},
          new RequestOptions({ headers: this.headers })
      ).map(res => res.json());
    }

    processTicket(id): Observable<Ticket> {
      return this.http.post(API_URL + '/processTicket/' + id + '/process', {},
          new RequestOptions({ headers: this.headers })
      ).map(res => res.json());
    }

    removeTicket(id): Observable<Ticket> {
      return this.http.post(API_URL + '/removeTicket/' + id, {},
          new RequestOptions({ headers: this.headers })
      ).map(res => res.json());
    }
}