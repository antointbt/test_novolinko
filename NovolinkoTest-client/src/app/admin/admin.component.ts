import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  contactForm: FormGroup;
  disabledSubmitButton: boolean = true;
  optionsSelect: Array<any>;
  checkPwd: boolean = true;

  ngOnInit() {
  }

  @HostListener('input') oninput() {

    if (this.contactForm.valid) {
      this.disabledSubmitButton = false;
      }
    }
  
    constructor(
      private router: Router,
      private fb: FormBuilder
      ) {
  
      this.contactForm = fb.group({
        'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
        'contactFormPassword': ['', Validators.required]
      });
    }
  
    onSubmit() {
      if (this.contactForm.value.contactFormEmail == "antoine@gmail.com" && this.contactForm.value.contactFormPassword == "root")
        this.router.navigate(['/chooseAdminOption']);
      else
        this.checkPwd = false;
    }

}
