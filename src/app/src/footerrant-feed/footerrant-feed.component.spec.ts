import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterrantFeedComponent } from './footerrant-feed.component';

describe('FooterrantFeedComponent', () => {
  let component: FooterrantFeedComponent;
  let fixture: ComponentFixture<FooterrantFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterrantFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterrantFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
