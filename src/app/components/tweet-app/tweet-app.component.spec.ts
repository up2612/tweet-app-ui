import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetAppComponent } from './tweet-app.component';

describe('TweetAppComponent', () => {
  let component: TweetAppComponent;
  let fixture: ComponentFixture<TweetAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
