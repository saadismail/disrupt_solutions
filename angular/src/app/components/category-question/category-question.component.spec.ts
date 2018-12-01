import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryQuestionComponent } from './category-question.component';

describe('CategoryQuestionComponent', () => {
  let component: CategoryQuestionComponent;
  let fixture: ComponentFixture<CategoryQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
