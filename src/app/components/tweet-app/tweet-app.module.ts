import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TweetAppComponent } from './tweet-app.component';
import { MatMenuModule } from '@angular/material/menu'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {path:'',component:TweetAppComponent},
      {path:'tweet-app',component:TweetAppComponent}
    ])
  ]
})
export class TweetAppModule { 
  constructor(library:FaIconLibrary){
    library.addIconPacks(fas,far)
  }
}
