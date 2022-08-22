import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetAppHeaderbarComponent } from './tweet-app-headerbar.component';

describe('TweetAppHeaderbarComponent', () => {
  let component: TweetAppHeaderbarComponent;
  let fixture: ComponentFixture<TweetAppHeaderbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetAppHeaderbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetAppHeaderbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
