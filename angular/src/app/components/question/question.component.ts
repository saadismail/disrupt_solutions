import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  question: Object;
  answers$: Object;
  tags$: Object;
  questionBody: String;
  comment: String;

  constructor(
    public authService: AuthService,
    private dataService: DataService,
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    let params: any = this.activatedRoute.snapshot.params;

    this.dataService.getQuestionByQuestionid(params.id).subscribe(
      data => {
        this.question = data[0];

        this.dataService.getTagsByQuestionid(params.id).subscribe(
          data => {
            this.tags$ = data;

            this.dataService.getAnswersByQuestionid(params.id).subscribe(
              data => {
                this.answers$ = data;
              }
            )
          }
        )

      }
    );
  }

  onNewCommentSubmit() {
    const comment = {
      body: this.comment,
      author_id: this.authService.getLoggedInUserId(),
      question_id: this.question.id
    }

    // Required Fields
    if (!this.validateService.validateNewComment(comment)) {
      this.flashMessagesService.show('Please fill all the fields', { cssClass: 'alert alert-dismissible alert-danger', timeout: 1000 })
      return false;
    }
    
    this.dataService.newComment(comment).subscribe(data => {
      if (data.success) {
        this.flashMessagesService.show('Comment added successfully', { cssClass: 'alert alert-dismissible alert-success', timeout: 1000 })
        // this.router.navigate(['/question/' + this.question.id]);
        // console.log(this.question);
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

  voteUp() {
    console.log("Upped");
  }

  voteDown() {
    console.log("Downed");
  }
}
