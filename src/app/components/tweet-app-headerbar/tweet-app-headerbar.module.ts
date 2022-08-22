import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TweetAppHeaderbarComponent } from './tweet-app-headerbar.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    
    RouterModule.forChild([
      {path:'',component:TweetAppHeaderbarComponent},
      {path:'tweet-app-headerbar',component:TweetAppHeaderbarComponent}
    ])
  ]
})
export class TweetAppHeaderbarModule { }
