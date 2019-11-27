import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SinglePostComponent } from './src/single-post/single-post.component';
import { AppComponent } from './app.component';
import { FooterrantFeedComponent } from './src/footerrant-feed/footerrant-feed.component';
import { UserProfileComponent } from './src/user-profile/user-profile.component';
import { PrivacyPolicyComponent } from './src/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './terms-condition/terms-condition.component';
import { HashtagFeedComponent } from './src/hashtag-feed/hashtag-feed.component';
import { LandingPageComponent } from './src/landing-page/landing-page.component';

const routes: Routes = [
  
// <<<<<<< HEAD
//   { path: 'feed', component: FooterrantFeedComponent },
//   { path: 'thisPost/:videoId', component: SinglePostComponent },
//   { path: 'user/:userId', component: UserProfileComponent },
// =======
{ path: '',   
loadChildren: "./src/landing-page/landing-page.module#LandingPageModule" 
},
  { path: 'feed',   
  loadChildren: "./src/footerrant-feed/footerrant-feed.module#FooterrantFeedModule" 
}
  ,
  { path: 'thisPost/:videoId',
  loadChildren: "./src/single-post/single-post.module#SinglePostModule"
},
  { path: 'user/:userId'
  ,
  loadChildren: "./src/user-profile/user-profile.module#UserProfileModule" },
// >>>>>>> feature/checkLazyLoadingDmmyBrnach
  { path: 'privacy' , component : PrivacyPolicyComponent}
  ,
  { path: 'term-condition' , component : TermsConditionComponent}
  ,
// <<<<<<< HEAD
//   { path: 'hashtag/:tag' , component : HashtagFeedComponent}
//   ,
//   { path: '' , component : LandingPageComponent}
// =======
  { path: 'hashtag/:tag' 
  ,
  loadChildren: "./src/hashtag-feed/hashtag-feed.module#HashTagFeedModule"}
  
// >>>>>>> feature/checkLazyLoadingDmmyBrnach
  
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
