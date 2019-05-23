import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

export interface Ticket {
    id: Number,
    libelle: String
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
        .map(res => res.json());
    }
}