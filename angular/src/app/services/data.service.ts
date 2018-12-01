import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) { }

  getTags() {
    return this.http.get('http://localhost:3000/tags')
      .pipe(map(res => res.json()))
  }
}
