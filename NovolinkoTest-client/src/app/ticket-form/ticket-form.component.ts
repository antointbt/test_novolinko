import { Component, OnInit, EventEmitter, Output  } from '@angular/core';
import { Ticket, TicketService } from '../ticket.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import 'rxjs/Rx';

@Component({
    selector: 'app-ticket-form',
    templateUrl: './ticket-form.component.html',
    styleUrls: ['./ticket-form.component.scss']
})

export class TicketFormComponent implements OnInit {
    errors: string = '';
    errorMessage: string;
    isLoading: boolean = false;
    contactForm: FormGroup;
    disabledSubmitButton: boolean = true;
    optionsSelect: Array<any>;
    myDate = new Date();
    date: string = '';
    public appsName: Array<any>;

    constructor(
      private ticketService: TicketService,
      private router: Router,
      private fb: FormBuilder,
      private datePipe: DatePipe,) {
      
        this.contactForm = fb.group({
        'contactFormLibelle': ['', Validators.required],
        'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
        'contactFormCategory': ['', Validators.required],
        'contactFormPriority': ['', Validators.required],
        'contactFormDescription': ['', Validators.required]
        });

      this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    }

    @Output()
      ticketAdded: EventEmitter<Ticket> = new EventEmitter<Ticket>();

    @HostListener('input') oninput() {
      if (this.contactForm.valid) {
        this.disabledSubmitButton = false;
        }
      }
  
    ngOnInit() {
    }

    onSubmit() {
      this.isLoading = true;
      this.ticketService
          .addTicket({
              libelle: this.contactForm.value.contactFormLibelle,
              description: this.contactForm.value.contactFormDescription,
              category: this.contactForm.value.contactFormCategory,
              image: "image",
              email: this.contactForm.value.contactFormEmail,
              creationDate: this.date,
              priority: this.contactForm.value.contactFormPriority,
              status: "open"
          })
          .subscribe(
              ticket => {
                  this.isLoading = false;
                  this.ticketAdded.emit(ticket);
                  this.router.navigate(['/home']);
              },
              error => {
                  this.errors = error.json().errors;
                  this.isLoading = false;
              }
          );
    }
}