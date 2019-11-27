import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashtagFeedComponent } from './hashtag-feed.component';

describe('HashtagFeedComponent', () => {
  let component: HashtagFeedComponent;
  let fixture: ComponentFixture<HashtagFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashtagFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashtagFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
