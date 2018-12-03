import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: Http) { }

  getTags() {
    return this.http.get('http://localhost:3000/tags')
      .pipe(map(res => res.json()));
  }

  getQuestionsByTagId(id) {
    return this.http.get('http://localhost:3000/tag/' + id)
      .pipe(map(res => res.json()));
  }

  getQuestionByQuestionid(id) {
    return this.http.get('http://localhost:3000/question/' + id)
      .pipe(map(res => res.json()));
  }

  getTagsByQuestionid(id) {
    return this.http.get('http://localhost:3000/tags/' + id)
      .pipe(map(res => res.json()));
  }

  getAnswersByQuestionid(id) {
    return this.http.get('http://localhost:3000/answers/' + id)
      .pipe(map(res => res.json()));
  }

  getQuestions() {
    return this.http.get('http://localhost:3000/questions')
      .pipe(map(res => res.json()));
  }

  newQuestion(question) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post('http://localhost:3000/new-question', question, {headers: headers})
      .pipe(map(res => res.json()))
  }

  newComment(comment) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post('http://localhost:3000/new-comment', comment, {headers: headers})
      .pipe(map(res => res.json()))
  }
}
