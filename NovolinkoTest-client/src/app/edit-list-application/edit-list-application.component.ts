import { Component, OnInit } from '@angular/core';
import { ApplicationName, ApplicationNameService } from '../application-name.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-edit-list-application',
  templateUrl: './edit-list-application.component.html',
  styleUrls: ['./edit-list-application.component.scss']
})
export class EditListApplicationComponent implements OnInit {
    appsName: ApplicationName[];
    errorMessage: string;
    editField: string;
    personList: Array<any>;

    constructor(private applicationNameService: ApplicationNameService) {}

    ngOnInit() {
      this.getApplicationName();
    }

    updateList(id: number, property: string, event: any) {
      const editField = event.target.textContent;
      this.personList[id][property] = editField;
      this.applicationNameService
          .editApplicationName(this.personList[id].id, editField)
          .subscribe(
              response => {
              },
              error => {
                  this.errorMessage = <any>error;
              }
          );
    }

    remove(id: any) {
      this.applicationNameService
        .removeApplicationName(this.personList[id].id)
        .subscribe(
            response => {
              this.personList.splice(id, 1);
            },
            error => {
                this.errorMessage = <any>error;
            }
        );
    }

    add() {
      this.applicationNameService
          .addApplicationName({
              libelle: "new application",
          })
          .subscribe(
              res => {
                this.personList.push({id: res.id, libelle: "new application"});
              },
              error => {
                error => this.errorMessage = <any>error
              }
          );
    }

    changeValue(id: number, property: string, event: any) {
      this.editField = event.target.textContent;
    }

    getApplicationName() {
      this.applicationNameService
          .getApplicationName()
          .subscribe(
            appsName => {
              this.personList = appsName;
            },
              error => this.errorMessage = <any>error
          );
    }
}