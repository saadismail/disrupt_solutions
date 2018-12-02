import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {

  title: String;
  body: String;
  tags: String;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  onNewQuestionSubmit() {
    const question = {
      title: this.title,
      body: this.body,
      tags: this.tags,
      status: 1, // 0 = deleted, 1 = unsolved, 2 = solved
      author_id: this.authService.getLoggedInUserId()
    }

    // Required Fields
    if (!this.validateService.validateNewQuestion(question)) {
      this.flashMessagesService.show('Please fill all the fields', { cssClass: 'alert alert-dismissible alert-danger', timeout: 1000 })
      return false;
    }
    
    this.dataService.newQuestion(question).subscribe(data => {
      console.log(data);
      if (data.success) {
        this.flashMessagesService.show('Question added successfully', { cssClass: 'alert alert-dismissible alert-success', timeout: 1000 })
        this.router.navigate(['/question/' + data.question_id]);
      } else {
        if (data.msg != undefined) {
          this.flashMessagesService.show(data.msg, { cssClass: 'alert alert-dismissible alert-danger', timeout: 1000 });
        } else {
          this.flashMessagesService.show('Something went wrong', { cssClass: 'alert alert-dismissible alert-danger', timeout: 1000 });
        }
        return false;
      }
    });

  }

}
