import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'login',
  loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule)
},
{
  path: 'tweet-app',
  loadChildren: () => import('./components/tweet-app/tweet-app.module').then((m) => m.TweetAppModule)
},
{
  path: 'tweet-app-headerbar',
  loadChildren: () => import('./components/tweet-app-headerbar/tweet-app-headerbar.module').then((m) => m.TweetAppHeaderbarModule)
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
