import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { OnChange } from 'angular-bootstrap-md/lib/utils/decorators';

export interface ApplicationName {
    id: Number,
    libelle: String,
}

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class ApplicationNameService {

    private accessToken;
    private headers;

    constructor(private http: Http) {
    }

    getApplicationName(): Observable<ApplicationName[]> {
      return this.http.get(API_URL + '/applicationName',
          new RequestOptions({ headers: this.headers })
      )
      .map(res => {
          let modifiedResult = res.json();
          modifiedResult = modifiedResult.map(function(appName) {
            appName.isUpdating = false;
            return appName;
          });
          return modifiedResult;
      });
    }

    addApplicationName(appName): Observable<ApplicationName> {
      return this.http.post(API_URL + '/addApplicationName', appName, 
          new RequestOptions({ headers: this.headers })
      ).map(res => res.json());
    }

    editApplicationName(id, newLibelle): Observable<ApplicationName> {
      return this.http.post(API_URL + '/editApplicationName/' + id + "/" + newLibelle, {},
          new RequestOptions({ headers: this.headers })
      ).map(res => res.json());
    }

    removeApplicationName(id): Observable<ApplicationName> {
      return this.http.post(API_URL + '/removeApplicationName/' + id, {},
          new RequestOptions({ headers: this.headers })
      ).map(res => res.json());
    }
}