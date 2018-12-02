import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  questions$: Object;

  constructor(private data: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    let params: any = this.activatedRoute.snapshot.params;

    this.data.getQuestionsByTagId(params.id).subscribe(
      data => this.questions$ = data
    );
  }

}
