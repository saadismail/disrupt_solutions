import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private data: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let params: any = this.activatedRoute.snapshot.params;

    this.data.getQuestionByQuestionid(params.id).subscribe(
      data => {
        this.question = data[0];

        this.data.getTagsByQuestionid(params.id).subscribe(
          data => {
            this.tags$ = data;

            this.data.getAnswersByQuestionid(params.id).subscribe(
              data => {
                this.answers$ = data;


                console.log(this.question);
                console.log(this.tags$);
                console.log(this.answers$);
              }
            )
          }
        )

      }
    );
  }

}
