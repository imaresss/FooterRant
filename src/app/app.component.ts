import { Component } from '@angular/core';
import { GetContentRequest } from './GetContentRequest';
import { PublishService } from './publish.service';
import { Router ,NavigationEnd } from '@angular/router';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { ArticleContentResponseList } from './ArticleContentResponseList';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import {BehaviorSubject, Subscription} from 'rxjs';

import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { LoginService } from './login.service';
declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {


  constructor(public router: Router){   

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
          gtag('config', 'UA-150762736-3', 
                {
                  'page_path': event.urlAfterRedirects
                }
               );
       }
    }
 )}
    
  // title = 'footerrant';

  // private user: SocialUser;
  // private loggedIn: boolean;
  
  // // dataSource: FactsDataSource;
  // finished = false;
  // constructor(private publishService: PublishService,  private router: Router ,private loginService: LoginService) {
   
  // ///  this.dataSource = new FactsDataSource(publishService);
  //    }

  //   unPubLishedContentList: ArticleContentResponseList[];

  //   pageNo =1;
  // ngOnInit() {
  //   // this.authService.authState.subscribe((user) => {
  //   //   this.user = user;
  //   //   this.loggedIn = (user != null);
  //   // });
  //    this.pageNo = 1;
  //    this.unPubLishedContentList = new Array<ArticleContentResponseList>();
  //    this.getAllPublishedContent(this.pageNo);
  // }
  // // signInWithGoogle(platform : string): void {

    
  // //   platform = GoogleLoginProvider.PROVIDER_ID;
  // //   this.authService.signIn(platform).then(
  // //     (response) => {
  // //       console.log(platform + " logged in user data is= " , response);
  // //       this.user = response;
  // //     }
  // //   );

  // //   // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // // }
  // // signOut(): void {
  // //   this.authService.signOut();
  // // }

  //    getAllPublishedContent(pageNo){
  //      console.log("pageno is "+pageNo)
  //   var request = new GetContentRequest();  
  //   request.authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIyNCwibG9naW5JZCI6MjQ1LCJwbGF0Zm9ybSI6IkFQUCIsImlhdCI6MTU3MTQ3MTUxNiwiZXhwIjoxNTc2NjU1NTE2fQ.I3iaLzv3dz9wbi06kwSxIL-qtg9mytvtJWy3_KII-88';
  //   request.publishType = "PUBLISHED";
  //   this.publishService.getAllPublishedStory(request , pageNo).subscribe(contentResponse => {
  //     if(contentResponse.error!=null){
  //       alert(contentResponse.error.errorMsg);
  //       return;
  //     }
  //     console.log(contentResponse.data.list.length)
  //     if(contentResponse.data.list.length == 0)
  //     {
  //       console.log(this.finished)
  //       this.finished = true
  //     }

  //     this.unPubLishedContentList =this.unPubLishedContentList.concat(contentResponse.data.list);
  //     console.log(this.unPubLishedContentList[0].videoId);
    
  //     // this.dataSource = new MatTableDataSource( this.unPubLishedContentList);
  //     // this.dataSource.paginator = this.paginator;
     
  //   });
  
  // }
  // onScroll()
  // {console.log("scrolled Down");

  //   this.pageNo = this.pageNo + 1
  //   this.getAllPublishedContent(this.pageNo);

  // }

  // onScrollUp()
  // {
  //   console.log("scrolled up");
  //   this.getAllPublishedContent(this.pageNo - 1);

  // }
}


// export class FactsDataSource extends DataSource<ArticleContentResponseList | undefined> {

//   private cachedFacts = Array.from<ArticleContentResponseList>({ length: 0 });
//   private dataStream = new BehaviorSubject<(ArticleContentResponseList | undefined)[]>(this.cachedFacts);
//   private subscription = new Subscription();

//   constructor(private publishService: PublishService) {
//     super();
//     this._fetchFactPage();
//   }

//   connect(collectionViewer: CollectionViewer): Observable<(ArticleContentResponseList | undefined)[] | ReadonlyArray<ArticleContentResponseList | undefined>> {
//     this.subscription.add(collectionViewer.viewChange.subscribe(range => {
//       const currentPage = this._getPageForIndex(range.end);
//       if (currentPage > this.lastPage) {
//         this.lastPage = currentPage;
//         this._fetchFactPage();
//       }
      
//     }));
//     return this.dataStream;
//   }

//   disconnect(collectionViewer: CollectionViewer): void {
//     this.subscription.unsubscribe();
//   }

//   private pageSize = 10;
// private lastPage = 0;

// private _fetchFactPage(): void {
//   console.log("fetch it")
//   var request = new GetContentRequest();  
//   request.authToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIyNCwibG9naW5JZCI6MjQ1LCJwbGF0Zm9ybSI6IkFQUCIsImlhdCI6MTU3MTQ3MTUxNiwiZXhwIjoxNTc2NjU1NTE2fQ.I3iaLzv3dz9wbi06kwSxIL-qtg9mytvtJWy3_KII-88';
//   request.publishType = "PUBLISHED";
//   for (let i = 0; i < this.pageSize; ++i) {
//     this.publishService.getAllPublishedStory(request , 1).subscribe(res => {
//       this.cachedFacts = this.cachedFacts.concat(res.data.list);
//       this.dataStream.next(this.cachedFacts);
//       console.log("fetch it"+ this.dataStream)
//     });


//   }
// }

// private _getPageForIndex(i: number): number {
//   return Math.floor(i / this.pageSize);
// }
// }

