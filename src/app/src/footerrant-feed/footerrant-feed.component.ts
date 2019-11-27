import { Component, OnInit, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { SocialUser, AuthService } from 'angularx-social-login';
import { PublishService } from '../../services/publish.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { ArticleContentResponseList } from '../../ArticleContentResponseList';
import { GetContentRequest } from '../../GetContentRequest';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import { PostLikeRequest } from 'src/app/models/Like/PostLikeRequest';
import { CommentRequest } from 'src/app/models/Comment/CommentRequest';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { AuthCheckService } from 'src/app/services/auth-check.service';
import { BaseRequest } from 'src/app/BaseRequest';
import { NewAuthRequest } from 'src/app/models/AuthCheck/NewAuthRequest';
import { CookieService } from 'ngx-cookie-service';
import { PostRantRequest } from 'src/app/models/PostRant/PostRantRequest';
import { UserRequest } from 'src/app/models/User/UserRequest';
import { User } from 'src/app/User';
//import { DomSanitizer } from '@angular/platform-browser';
import { Meta, MetaDefinition } from '@angular/platform-browser';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

declare function homePage(page: string): any;
@Component({
  selector: 'app-footerrant-feed',
  templateUrl: './footerrant-feed.component.html',
  styleUrls: ['./footerrant-feed.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FooterrantFeedComponent implements OnInit {
  url;
  array = [];
  title = 'footerrant';
  logged = false;
  private user: SocialUser;
  private loggedIn: boolean;
  postLike: PostLikeRequest;
  postComment: CommentRequest;
  postRant: PostRantRequest;
  request: BaseRequest;
  isVisible: Boolean
  isVisibleRant: Boolean
  inputValue: string
  inputValueRant: string
  newAuthRequest: NewAuthRequest;
  hashTags: string[];
  rantId: string;
  hashTagsNew: string[];
  userRequest: UserRequest;
  userInfo: User;
  thumbnail1: File;
  inputTextShow: Boolean;
  linkShare: string;
  uuid: string;
  // dataSource: FactsDataSource;
  @ViewChild('file') file: ElementRef;
  finished = false;
  constructor(private publishService: PublishService, private router: Router,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private modalService: NzModalService, private authService: AuthCheckService,
    private cookieService: CookieService, private meta: Meta, public sanitizer: DomSanitizer) {

    ///  this.dataSource = new FactsDataSource(publishService);
  }

  unPubLishedContentList: ArticleContentResponseList[];
  unPubLishedContentListLatest: ArticleContentResponseList[];

  pageNo = 1;

  ngOnInit() {
    this.inputTextShow = false;
    console.log(event);
   
    const keywords: MetaDefinition = {
      name: "keywords",
      content: "angular2, java, javaEE, angular-universal"
    }
    const description: MetaDefinition = {
      name: "description",
      content: "This is a description"
    }
    this.meta.addTags([keywords, description]);
    this.pageNo = 1;
    this.unPubLishedContentList = new Array<ArticleContentResponseList>();
    this.unPubLishedContentListLatest = new Array<ArticleContentResponseList>();
    this.authService.checkIfLoginNonLogin();
    //     console.log("the logged in sttus is "+this.cookieService.get('logged'))

    if (this.storage.get("authToken") == null && this.storage.get("nonLoginAuth") == null) {
      this.getAllPublishedContentPreNonLogin(this.pageNo);
      this.getAllPublishedContentPreNonLoginLatest(this.pageNo);
      this.authService.checkLoggedIn();
    }

    else if (this.cookieService.get('logged') == 'true' || this.storage.get("authToken") != null) {
      this.getAllPublishedContent(this.pageNo);
      this.getAllPublishedContentLatest(this.pageNo);
      this.setUserInfo();
    }
    else {
      this.getAllRantsNonLoginLatest(this.pageNo);
      this.getAllRantsNonLogin(this.pageNo);
      this.authService.checkLoggedIn();
    }

    homePage('web_screen_homepage');
  }

  onThumbnail1Change(event) {
    if (event.target.files.length > 0) {


      this.thumbnail1 = event.target.files[0];

      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      console.log("the url is " + this.url)
      console.log("ehe thumbnail is " + this.thumbnail1)

      reader.onerror = (event: any) => {
        console.log("File could not be read: " + event.target.error.code);
      };
      this.linkShare = null;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  clearThumbnail1() {
    this.file.nativeElement.value = '';
    this.thumbnail1 = null;
    this.url = null;
  }
 

  hideEmbed() {
    this.inputTextShow = false
  }

  showEmbed() {
    if (this.inputTextShow) {
      this.inputTextShow = false
    }
    else {
      this.inputTextShow = true;
    }
    this.thumbnail1 = null;
  }

  setUserInfo() {
    this.userRequest = new UserRequest();
    this.loggedIn = true;
    this.userRequest.authToken = this.storage.get("authToken");
    this.publishService.getUserInfo(this.userRequest).subscribe(response => {

      if (response.error != null) {
        //   console.log("error login here" + response.error.errorMsg)
        this.authService.logout()
        return;
      }

      this.userInfo = new User();
      this.userInfo.firstName = response.data.firstName;
      this.userInfo.lastName = response.data.lastName;
      this.userInfo.id = response.data.id;
      this.userInfo.profileUrl = response.data.profileUrl;

      //    this.valueChange.emit('child1');
    });

  }


  

  getAllRantsNonLogin(pageNo) {
    //  console.log("non login is here non login")
    var request = new GetContentRequest();


    request.authToken = this.storage.get('nonLoginAuth');
    request.type = ""

    this.publishService.getAllRantNonLogin(request, pageNo).subscribe(contentResponse => {

      if (contentResponse.error != null) {
        alert("no soif noiseeguige")
        //   console.log(contentResponse.error.errorMsg);
        this.authService.logout();
        return;
      }
      //   console.log(contentResponse.data.list.length)
      if (contentResponse.data.list.length == 0) {
        //   console.log(this.finished)
        this.finished = true
      }

      this.unPubLishedContentList = this.unPubLishedContentList.concat(contentResponse.data.list);

      for (var i = 0; i < this.unPubLishedContentList.length; i++) {
        if (this.unPubLishedContentList[i].isLikeByMe) {
          this.unPubLishedContentList[i].imagePath = "heartit.svg";
        }
        else {
          this.unPubLishedContentList[i].imagePath = "heart.svg";
        }
    }

    
    });
  }

  getAllPublishedContent(pageNo) {

    var request = new GetContentRequest();
    request.authToken = this.storage.get('authToken');

    request.type = ""
    this.publishService.getAllPublishedStory(request, pageNo).subscribe(contentResponse => {
      if (contentResponse.error != null) {
        // alert(contentResponse.error.errorMsg);
        this.authService.logout();
        return;
      }
      //  console.log(contentResponse.data.list.length)
      if (contentResponse.data.list.length == 0) {
        //    console.log(this.finished)
        this.finished = true
      }

      this.unPubLishedContentList = this.unPubLishedContentList.concat(contentResponse.data.list);

      for (var i = 0; i < this.unPubLishedContentList.length; i++) {
        if (this.unPubLishedContentList[i].isLikeByMe) {
          this.unPubLishedContentList[i].imagePath = "heartit.svg";
        }
        else {
          this.unPubLishedContentList[i].imagePath = "heart.svg";
        }

      }

     

    });

  }


  getAllPublishedContentPreNonLogin(pageNo) {
    //  console.log("PRE login users")
    var request = new GetContentRequest();
    //  request.authToken = this.storage.get('authToken');

    request.type = ""
    this.publishService.getAllRantPreNonLogin(request, pageNo).subscribe(contentResponse => {
      if (contentResponse.error != null) {
        //  alert(contentResponse.error.errorMsg);
        this.authService.logout();
        return;
      }
      // console.log(contentResponse.data.list.length)
      if (contentResponse.data.list.length == 0) {
        // console.log(this.finished)
        this.finished = true
      }

      this.unPubLishedContentList = this.unPubLishedContentList.concat(contentResponse.data.list);

      for (var i = 0; i < this.unPubLishedContentList.length; i++) {
        if (this.unPubLishedContentList[i].isLikeByMe) {
          this.unPubLishedContentList[i].imagePath = "heartit.svg";
        }
        else {
          this.unPubLishedContentList[i].imagePath = "heart.svg";
        }
      }

      //console.log(this.unPubLishedContentList[0].videoId);

      // this.dataSource = new MatTableDataSource( this.unPubLishedContentList);
      // this.dataSource.paginator = this.paginator;

    });

  }


  getAllPublishedContentPreNonLoginLatest(pageNo) {
    //console.log("PRE login users")
    var request = new GetContentRequest();
    //  request.authToken = this.storage.get('authToken');

    request.type = "LATEST"
    this.publishService.getAllRantPreNonLogin(request, pageNo).subscribe(contentResponse => {
      if (contentResponse.error != null) {
        // alert(contentResponse.error.errorMsg);
        this.authService.logout();
        return;
      }
      //console.log(contentResponse.data.list.length)
      if (contentResponse.data.list.length == 0) {
        // console.log(this.finished)
        this.finished = true
      }

      this.unPubLishedContentListLatest = this.unPubLishedContentListLatest.concat(contentResponse.data.list);

      for (var i = 0; i < this.unPubLishedContentListLatest.length; i++) {
        if (this.unPubLishedContentListLatest[i].isLikeByMe) {
          this.unPubLishedContentListLatest[i].imagePath = "heartit.svg";
        }
        else {
          this.unPubLishedContentListLatest[i].imagePath = "heart.svg";
        }
      }

  
    });

  }




  getAllRantsNonLoginLatest(pageNo) {
    //  console.log("non login is here non login")
    var request = new GetContentRequest();
    request.authToken = this.storage.get('nonLoginAuth');
    request.type = "LATEST"
    this.publishService.getAllRantNonLogin(request, pageNo).subscribe(contentResponse => {
      if (contentResponse.error != null) {
        //      console.log(contentResponse.error.errorMsg);
        this.authService.logout();
        return;
      }
      //   console.log(contentResponse.data.list.length)
      if (contentResponse.data.list.length == 0) {
        //  console.log(this.finished)
        this.finished = true
      }

      this.unPubLishedContentListLatest = this.unPubLishedContentListLatest.concat(contentResponse.data.list);

      for (var i = 0; i < this.unPubLishedContentListLatest.length; i++) {
        if (this.unPubLishedContentListLatest[i].isLikeByMe) {
          this.unPubLishedContentListLatest[i].imagePath = "heartit.svg";
        }
        else {
          this.unPubLishedContentListLatest[i].imagePath = "heart.svg";
        }
      }

      // console.log(this.unPubLishedContentListLatest[0].videoId);

      // this.dataSource = new MatTableDataSource( this.unPubLishedContentList);
      // this.dataSource.paginator = this.paginator;

    });
  }

  getAllPublishedContentLatest(pageNo) {
    //  console.log("login users")
    //  console.log("pageno is "+pageNo)
    var request = new GetContentRequest();
    request.authToken = this.storage.get('authToken');

    request.type = "LATEST"
    this.publishService.getAllPublishedStory(request, pageNo).subscribe(contentResponse => {
      if (contentResponse.error != null) {
        this.authService.logout();
        //    alert(contentResponse.error.errorMsg);
        return;
      }
      //  console.log(contentResponse.data.list.length)
      if (contentResponse.data.list.length == 0) {
        //   console.log(this.finished)
        this.finished = true
      }

      this.unPubLishedContentListLatest = this.unPubLishedContentListLatest.concat(contentResponse.data.list);

      for (var i = 0; i < this.unPubLishedContentListLatest.length; i++) {
        if (this.unPubLishedContentListLatest[i].isLikeByMe) {
          this.unPubLishedContentListLatest[i].imagePath = "heartit.svg";
        }
        else {
          this.unPubLishedContentListLatest[i].imagePath = "heart.svg";
        }
      }

      // console.log(this.unPubLishedContentListLatest[0].videoId);

      // this.dataSource = new MatTableDataSource( this.unPubLishedContentList);
      // this.dataSource.paginator = this.paginator;

    });

  }

  check(): void {
    if (this.cookieService.get('logged') == 'false') {

      this.authService.checkLoggedIn();

    }
  }

  rantLike(rantId: string, like: boolean, index: number): void {
    if (this.cookieService.get('logged') == 'true') {
      this.unPubLishedContentList[index].isLikeByMe = like
      if (this.unPubLishedContentList[index].isLikeByMe) {
        this.unPubLishedContentList[index].imagePath = "heartit.svg";
      }
      else {
        this.unPubLishedContentList[index].imagePath = "heart.svg";
      }
      //   console.log(rantId + " rantid is ")
      // console.log("like or not "+ like)
      this.authService.checkAuthValidity()
      this.postLike = new PostLikeRequest();
      this.postLike.like = like;
      this.postLike.videoId = rantId;
      this.postLike.authToken = this.storage.get('authToken');
      this.publishService.postLike(this.postLike).subscribe(likeResponse => {

        if (likeResponse.error != null) {
          //   alert(likeResponse.error.errorMsg);
          this.authService.logout();
          return;
        }

      });

    }
    else {
      // this.authService.checkLoggedIn();
    }

  }


  rantLikeLatest(rantId: string, like: boolean, index: number): void {
    if (this.cookieService.get('logged') == 'true') {
      this.unPubLishedContentListLatest[index].isLikeByMe = like
      if (this.unPubLishedContentListLatest[index].isLikeByMe) {
        this.unPubLishedContentListLatest[index].imagePath = "heartit.svg";
      }
      else {
        this.unPubLishedContentListLatest[index].imagePath = "heart.svg";
      }
      //  console.log(rantId + " rantid is ")
      // console.log("like or not "+ like)
      this.authService.checkAuthValidity()
      this.postLike = new PostLikeRequest();
      this.postLike.like = like;
      this.postLike.videoId = rantId;
      this.postLike.authToken = this.storage.get('authToken');
      this.publishService.postLike(this.postLike).subscribe(likeResponse => {

        if (likeResponse.error != null) {
          //     alert(likeResponse.error.errorMsg);
          this.authService.logout();
          return;
        }

      });

    }
    else {
      // this.authService.checkLoggedIn();
    }

  }


  whatsApp(title): void {

    title = title.replace(/#/g, '');
    title = title.replace(/'/g, '');

    title = title.replace(/"/g, '');
    // this.meta.updateTag({ property: 'og:image', content: 'https://d4wkwlipf2eip.cloudfront.net/3/be4ca804-54bb-4f2e-a058-f8769b1862de_1573646515085.jpg' });
    // this.meta.updateTag({ property: 'og:description', content: 'Angular 4 meta service - updated' });
    // this.meta.updateTag({ property: 'og:site_name', content: 'Angular 4 meta service - updated' });
    // this.meta.updateTag({ property: 'og:title', content: 'Angular 4 meta service - updated' });

    console.log("setting meta tag")
    window.open("https://api.whatsapp.com/send?text=" + title + "     " + "    Shared via https://footerrant.com : World's biggest community of football fans")


  }


  facebook(title): void {
    title = title.replace(/#/g, '');
    title = title.replace(/'/g, '');

    title = title.replace(/"/g, '');

    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent("https://footerrant.com") + "&quote=" + title + "   \n\n  " + "Shared via https://footerrant.com : World's biggest community of football fans");


  }

  twitter(title): void {

    title = title.replace(/#/g, '');
    title = title.replace(/'/g, '');

    title = title.replace(/"/g, '');
    window.open(' https://twitter.com/intent/tweet?via=' + encodeURIComponent("https://footerrant.com") + "&text=" + title + "   " + "Shared via https://footerrant.com : World's biggest community of football fans");


  }


  share(rantId: string): void {
    console.log("eoif woiefiwneieof")
    this.postLike = new PostLikeRequest();
    if (this.storage.get("authToken") == null)
      this.postLike.authToken = this.storage.get("nonLoginAuth");
    else
      this.postLike.authToken = this.storage.get("authToken");
    this.postLike.videoId = rantId;

    this.publishService.postShare(this.postLike).subscribe(response => {

      if (response.error != null) {
        // alert(response.error);
        this.authService.logout();
      }
    });


  }

  rantComment(rantId: string): void {
    if (this.cookieService.get('logged') == 'true') {
      this.rantId = rantId;
      //  console.log("for coment rant id is "+ rantId)
      this.isVisible = true
    }
  }

  rantCommentIt(): void {
    this.isVisible = false;
    if (this.inputValue && this.inputValue.trim().length != 0) {
      //  console.log("ranit is "+ this.rantId + " and comment is "+ this.inputValue );
      this.authService.checkAuthValidity()
      this.postComment = new CommentRequest();

      this.postComment.authToken = this.storage.get('authToken')
      this.postComment.originalComment = this.inputValue;
      // this.postComment.comment = this.inputValue;
      this.postComment.comment = this.takeOutTagsFromInput(this.inputValue);
      this.postComment.splitComment = this.makeSplitTextTitle(this.inputValue);
      this.postComment.videoId = this.rantId;


      this.publishService.postComment(this.postComment).subscribe(commentResponse => {
        if (commentResponse.error != null) {
          //  alert(commentResponse.error.errorMsg);
          this.authService.logout();
          return;
        }

        this.router.navigate(['thisPost', this.rantId])
      })
    }
  }


  rantPost(): void {
    if (this.cookieService.get('logged') == 'true') {
      this.isVisibleRant = true
    }
  }


  rantPostIt(): void {
    this.isVisibleRant = false;
    if (this.inputValueRant && this.inputValueRant.trim().length != 0) {
      //  console.log("ranit is "+ " "+ this.inputValueRant );
      this.authService.checkAuthValidity()
      this.postRant = new PostRantRequest();

      if (this.linkShare != null) {
        if (this.linkShare.includes('youtu.be')) {
          this.linkShare = this.linkShare.replace(/\s/g, "");
          this.linkShare = this.linkShare.replace('youtu.be', 'www.youtube.com/embed')
          this.linkShare = this.linkShare.concat('?rel=0&modestbranding=1')
          this.postRant.shareLink = this.linkShare;
          this.postRant.type = "LINK"
        }

        else if (this.linkShare.includes('youtube')) {
          this.linkShare = this.linkShare.replace(/\s/g, "");
          this.linkShare = this.linkShare.replace('watch', 'embed')
          this.uuid = this.linkShare.split('=')[1]
          this.linkShare = 'https://www.youtube.com/embed/' + this.uuid + '?rel=0&modestbranding=1'
          // this.linkShare = this.linkShare.concat('/'+this.uuid)
          // this.linkShare = this.linkShare.concat('?rel=0&modestbranding=1')
          this.postRant.shareLink = this.linkShare;
          this.postRant.type = "LINK"
        }


      }

      if (this.thumbnail1 == null) {

        this.postRant.authToken = this.storage.get('authToken')
        this.postRant.originalTitle = this.inputValueRant;
        this.postRant.title = this.takeOutTagsFromInput(this.inputValueRant);
        this.postRant.splitTitle = this.makeSplitTextTitle(this.inputValueRant)
        this.postRant.tags = this.hashTags;
        //   console.log("final rant is "+ this.postRant.title)

        this.publishService.postRant(this.postRant).subscribe(commentResponse => {
          if (commentResponse.error != null) {
            //  alert(commentResponse.error.errorMsg);
            this.authService.logout();
            return;
          }

          this.router.navigate(['/user', this.userInfo.id])
        })

      }
      else {
        this.postRant.authToken = this.storage.get('authToken')
        this.postRant.originalTitle = this.inputValueRant;
        this.postRant.title = this.takeOutTagsFromInput(this.inputValueRant);
        this.postRant.splitTitle = this.makeSplitTextTitle(this.inputValueRant)
        this.postRant.tags = this.hashTags;
        this.postRant.type = 'IMAGE';
        this.publishService.postRantWithImage(this.prepareSave()).subscribe(commentResponse => {
          if (commentResponse.error != null) {
            //  alert(commentResponse.error.errorMsg);
            this.authService.logout();
            return;
          }

          this.router.navigate(['/user', this.userInfo.id])
        })
      }


    }
  }


  private prepareSave(): FormData {
    let input = new FormData();
    input.append('authToken', this.postRant.authToken + "");
    input.append('title', this.postRant.title);
    input.append('originalTitle', this.postRant.originalTitle);
    let tempTagStr = "";
    this.postRant.tags.forEach(element => {
      tempTagStr = tempTagStr + element + ",";
    });
    input.append('tags', tempTagStr.slice(0, -1));
    let tempSplitTitleStr = "";
    this.postRant.splitTitle.forEach(element => {
      tempSplitTitleStr = tempSplitTitleStr + element + ",";
    });
    input.append('splitTitle', tempSplitTitleStr.slice(0, -1));
    input.append('type', this.postRant.type);

    input.append('content', this.thumbnail1);
    input.append('id', this.userInfo.id.toString());

    return input;
  }

  singlePost(rantId): void {
    this.router.navigate(['/thisPost', rantId]);
  }


  onScroll() {
    //console.log("scrolled Down");

    this.pageNo = this.pageNo + 1

    if (this.storage.get("authToken") == null && this.storage.get("nonLoginAuth") == null) {
      this.getAllPublishedContentPreNonLogin(this.pageNo);
      this.getAllPublishedContentPreNonLoginLatest(this.pageNo);
    }

    if (this.cookieService.get('logged') == 'true' || this.storage.get("authToken") != null) {
      this.getAllPublishedContent(this.pageNo);
      this.getAllPublishedContentLatest(this.pageNo);

    }
    else {
      this.getAllRantsNonLogin(this.pageNo);
      this.getAllRantsNonLoginLatest(this.pageNo);
    }
  }

  onScrollUp() {
    //console.log("scrolled up");
    this.getAllPublishedContent(this.pageNo - 1);

  }

  makeSplitTextTitle(input: string): string[] {
    console.log("original text " + input)

    var splitTitleNewLine = input.replace(/\n/g, ' <br> ')
    console.log("splitted " + splitTitleNewLine)
    var splitTitle = splitTitleNewLine.split(/\s+/)

    console.log("split title is " + splitTitle)
    return splitTitle;
  }

  takeOutTagsFromInput(input: string): string {
    const matchHashtags = /(#\w+) ?/g;
    let hashtag;
    this.hashTags = new Array<string>();
    while ((hashtag = matchHashtags.exec(input))) {
      //  console.log("hashtags are "+ hashtag[1])
      this.hashTags.push(hashtag[1]);
    }

    //  console.log("length is "+ this.hashTags.length)
    var megaString = "";


    this.hashTagsNew = new Array<string>();
    this.hashTags.forEach(element => {
      // console.log("each hastag is "+ element)
      this.hashTagsNew.push("<a (click)='$event.stopPropagation()' href='/hashtag/" + element.substr(1) + "'  class = 'tag inactiveLink' >" + element + " </a>")
      // var str = this.content.split(element);
      // console.log(str)
    });

    for (var i = 0; i < this.hashTags.length; i++) {
      //console.log("old tags  "+ this.hashTags[i])
      //console.log("new tags  "+ this.hashTagsNew[i])
      input = input.replace(this.hashTags[i], this.hashTagsNew[i]);
      //console.log("new content is "+ input)
    }
    //  console.log("new content is "+ input)


    return input

  }
  handleCancel(): void {
    this.isVisibleRant = false
    this.isVisible = false;
  }
}



@Component({
  selector: 'nz-modal-custom-footer-component',
  template: `

  <app-login-modal></app-login-modal>
   
  `
})
export class NzModalCustomFooterComponent {
  constructor(private modal: NzModalRef) { }

  destroyModal(): void {
    this.modal.destroy();
  }
}

  // constructor() { }

  // ngOnInit() {
  // }


