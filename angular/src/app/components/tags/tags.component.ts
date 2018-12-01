import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getTags().subscribe(
      data => this.tags$ = data 
    );
  }

}
