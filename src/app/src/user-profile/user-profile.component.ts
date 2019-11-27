import { Component, OnInit, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthCheckService } from 'src/app/services/auth-check.service';

import { PublishService } from 'src/app/services/publish.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/User';
import { UserRequest } from 'src/app/models/User/UserRequest';
import { GetContentRequest } from 'src/app/GetContentRequest';
import { ArticleContentResponseList } from 'src/app/ArticleContentResponseList';
import { PostLikeRequest } from 'src/app/models/Like/PostLikeRequest';
import { CommentRequest } from 'src/app/models/Comment/CommentRequest';
import { GetCommentResponse } from 'src/app/models/Comment/GetCommentResponse';
import { PostRantRequest } from 'src/app/models/PostRant/PostRantRequest';
import { DomSanitizer } from '@angular/platform-browser';
declare function homePage(page: string): any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserProfileComponent implements OnInit {
  url;
  private sub: any;
  userId: number;
  userInfo: User;
  userArray: User[];
  userRequest: UserRequest;
  finished = false;
  isVisible: Boolean
  unPubLishedContentList: ArticleContentResponseList[];
  postLike: PostLikeRequest;
  postComment: CommentRequest;
  inputValue: string
  rantId: string;
  commentResponse: GetCommentResponse[];
  commentRequest: CommentRequest;
  hashTags: string[];
  hashTagsNew: string[];
  pageNo = 1;
  totalRantCount: number;
  isVisibleRant: Boolean
  inputValueRant: string
  totalCommentCount: number
  postRant: PostRantRequest;
  thumbnail1: File;
  iAmTheUser: Boolean;
  inputTextShow: Boolean;
  linkShare: string;
  uuid: string;
  @ViewChild('file') file: ElementRef;
  constructor(private router: ActivatedRoute, private route: Router, private authService: AuthCheckService,
    private publishService: PublishService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private cookieService: CookieService, public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.commentResponse = new Array<GetCommentResponse>();

    this.unPubLishedContentList = new Array<ArticleContentResponseList>();
    this.sub = this.router.params.subscribe(params => {
      this.userId = params['userId']; // (+) converts string 'id' to a number
      //   console.log("the userid here is "+ this.userId)


      this.authService.checkIfLoginNonLogin();
      //   console.log("the logged in sttus is "+this.cookieService.get('logged'))
      //  if(this.cookieService.get('logged') == 'True')
      //  this.getAPost(this.rantId);
      //  else
      //  this.getAPostNonLogin(this.rantId);


      // In a real app: dispatch action to load the details here.
      this.getUserInfo(this.userId);
      this.getAllPublishedContent(this.pageNo, this.userId);
      this.getCommentOnPost(this.userId, this.pageNo);
    });
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

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  clearThumbnail1() {
    this.file.nativeElement.value = '';
    this.thumbnail1 = null;
    this.url = null;
  }

  getUserInfo(userId: number) {
    this.userArray = new Array<User>();
    this.userRequest = new UserRequest();
    if (this.storage.get("authToken") == null) {
      this.userRequest.authToken = this.storage.get("nonLoginAuth");
    }
    else {
      this.userRequest.authToken = this.storage.get("authToken");
    }
    this.userRequest.userId = userId;
    this.publishService.getUserInfo(this.userRequest).subscribe(response => {

      if (response.error != null) {
        // alert('userInfo log'+response.error.errorMsg)
        //  console.log("error login here" + response.error.errorMsg)
        this.authService.logout()
        return;
      }

      this.userInfo = new User();
      this.userInfo.firstName = response.data.firstName;
      this.userInfo.lastName = response.data.lastName;
      this.userInfo.profileUrl = response.data.profileUrl;
      this.userInfo.id = response.data.id;


      this.userArray.push(this.userInfo);

    });

    if (this.cookieService.get("logged") == "true" || this.storage.get("authToken") != null) {

      this.userRequest.userId = 0;
      this.publishService.getUserInfo(this.userRequest).subscribe(response => {

        if (response.error != null) {
          //   alert('userInfo log'+ response.error.errorMsg)
          //  console.log("error login here" + response.error.errorMsg)
          this.authService.logout()
          return;
        }

        if (response.data.id == userId) {
          this.iAmTheUser = true;
          homePage('web_screen_my_profile')
        }
        else {
          this.iAmTheUser = false;
          homePage('web_screen_other_user_proile')
        }

      });
    }
    else {
      this.iAmTheUser = false;
    }
  }


  getAllPublishedContent(pageNo, userId) {
    // console.log("login users")
    // console.log("pageno is "+pageNo)
    var request = new GetContentRequest();

    if (this.storage.get("authToken") == null) {
      request.authToken = this.storage.get("nonLoginAuth");
    }
    else {
      request.authToken = this.storage.get("authToken");
    }
    //  request.authToken = this.storage.get("authToken");
    request.userId = userId;
    this.publishService.getRantOnUserid(request, pageNo).subscribe(contentResponse => {
      if (contentResponse.error != null) {
        // alert("rant id "+contentResponse.error.errorMsg);
        this.authService.logout();
        return;
      }
      console.log(contentResponse.data.list.length)
      if (contentResponse.data.list.length == 0) {
        console.log(this.finished)
        this.finished = true
      }

      this.unPubLishedContentList = this.unPubLishedContentList.concat(contentResponse.data.list);

      for (var i = 0; i < this.unPubLishedContentList.length; i++) {
        if (this.unPubLishedContentList[i].isLikeByMe) {
          //   console.log("title is "+ this.unPubLishedContentList[i].title)
          this.unPubLishedContentList[i].imagePath = "heartit.svg";
        }
        else {
          this.unPubLishedContentList[i].imagePath = "heart.svg";
        }
      }

      // console.log(this.unPubLishedContentList[0].videoId);

      // this.dataSource = new MatTableDataSource( this.unPubLishedContentList);
      // this.dataSource.paginator = this.paginator;

    });

  }


  onScroll() {
    //console.log("scrolled Down");

    this.pageNo = this.pageNo + 1
    this.getAllPublishedContent(this.pageNo, this.userId);
    this.getCommentOnPost(this.userId, this.pageNo);
  }


  check(): void {
    if (this.cookieService.get('logged') == 'false') {

      this.authService.checkLoggedIn();

    }
  }



  rantLike(rantId: string, like: boolean, index: number): void {
    if (this.cookieService.get('logged') == 'true') {
      this.unPubLishedContentList[index].isLikeByMe = like
      //  console.log(rantId + " rantid is ")
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


  rantComment(rantId: string): void {
    if (this.cookieService.get('logged') == 'true') {
      this.rantId = rantId;
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
      this.postComment.comment = this.takeOutTagsFromInput(this.inputValue);
      this.postComment.splitComment = this.makeSplitTextTitle(this.inputValue);
      this.postComment.videoId = this.rantId;


      this.publishService.postComment(this.postComment).subscribe(commentResponse => {
        if (commentResponse.error != null) {
          //   alert(commentResponse.error.errorMsg);
          this.authService.logout();
          return;
        }

        this.route.navigate(['thisPost', this.rantId])
      })
    }
  }

  takeOutTagsFromInput(input: string): string {
    const matchHashtags = /(#\w+) ?/g;
    let hashtag;
    this.hashTags = new Array<string>();
    while ((hashtag = matchHashtags.exec(input))) {
      // console.log("hashtags are "+ hashtag[1])
      this.hashTags.push(hashtag[1]);
    }

    //    console.log("length is "+ this.hashTags.length)
    var megaString = "";


    this.hashTagsNew = new Array<string>();
    this.hashTags.forEach(element => {
      //  console.log("each hastag is "+ element)
      this.hashTagsNew.push("<a href='/hashtag/" + element + "'  class = 'tag inactiveLink' >" + element + " </a>")
      // var str = this.content.split(element);
      // console.log(str)
    });

    for (var i = 0; i < this.hashTags.length; i++) {
      // console.log("old tags  "+ this.hashTags[i])
      // console.log("new tags  "+ this.hashTagsNew[i])
      input = input.replace(this.hashTags[i], this.hashTagsNew[i]);
      //    console.log("new content is "+ input)
    }
    //  console.log("new content is "+ input)


    return input

  }


  makeSplitTextTitle(input: string): string[] {
    console.log("original text " + input)

    var splitTitleNewLine = input.replace(/\n/g, ' <br> ')
    console.log("splitted " + splitTitleNewLine)
    var splitTitle = splitTitleNewLine.split(/\s+/)

    console.log("split title is " + splitTitle)
    return splitTitle;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleRant = false;
  }

  whatsApp(title): void {
    title = title.replace(/#/g, '');
    title = title.replace(/'/g, '');

    title = title.replace(/"/g, '');
    window.open("https://api.whatsapp.com/send?text=" + title + "     " + "Shared via https://footerrant.com : World's biggest community of football fans")


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
    this.postLike = new PostLikeRequest();
    if (this.storage.get("authToken") == null)
      this.postLike.authToken = this.storage.get("nonLoginAuth");
    else
      this.postLike.authToken = this.storage.get("authToken");
    this.postLike.videoId = rantId;

    this.publishService.postShare(this.postLike).subscribe(response => {

      if (response.error != null) {
        //   alert(response.error);
        this.authService.logout();
      }
    });


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

  rantPost(): void {
    if (this.cookieService.get('logged') == 'true') {
      this.isVisibleRant = true
    }
  }

  rantPostIt(): void {
    this.isVisibleRant = false;
    if (this.inputValueRant && this.inputValueRant.trim().length != 0) {
      //   console.log("ranit is "+ " and comment is "+ this.inputValue );
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
        this.postRant.originalTitle = this.inputValueRant
        this.postRant.title = this.takeOutTagsFromInput(this.inputValueRant);
        this.postRant.splitTitle = this.makeSplitTextTitle(this.inputValueRant)
        this.postRant.tags = this.hashTags;
        //   console.log("final rant is "+ this.postRant.title)

        this.publishService.postRant(this.postRant).subscribe(commentResponse => {
          if (commentResponse.error != null) {
            //    alert(commentResponse.error.errorMsg);
            this.authService.logout();
            return;
          }
          window.location.reload();
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

          window.location.reload();
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


  getCommentOnPost(userId: number, pageNo: number) {
    //   console.log("trying to get comments .......")
    this.commentRequest = new CommentRequest();
    // this.commentRequest.authToken = this.storage.get('authToken')
    if (this.storage.get("authToken") == null) {
      this.commentRequest.authToken = this.storage.get("nonLoginAuth");
    }
    else {
      this.commentRequest.authToken = this.storage.get("authToken");
    }
    this.commentRequest.userId = userId;
    this.commentRequest.videoId = "";

    this.publishService.getCommentOnPostUserId(this.commentRequest, pageNo).subscribe(response => {


      if (response.error != null) {
        // alert(response.error.errorMsg);
        this.authService.logout()
        return;
      }

      if (response.data.list.length == 0) {
        console.log(this.finished)
        this.finished = true
      }

      this.commentResponse = this.commentResponse.concat(response.data.list);
      //  console.log("comment is " + this.commentResponse[0].comment)


    })
  }


  rantCommentLike(commentId, rantId, like, index): void {
    if (this.cookieService.get('logged') == 'true') {
      this.commentResponse[index].isLikeByMe = like
      this.postLike = new PostLikeRequest();
      this.postLike.like = like;
      this.postLike.videoId = rantId;
      this.postLike.commentId = commentId;
      this.postLike.authToken = this.storage.get('authToken');


      this.publishService.postCOmmentLike(this.postLike).subscribe(likeResponse => {

        if (likeResponse.error != null) {
          //  alert(likeResponse.error.errorMsg);
          this.authService.logout();
          return;
        }

      });
    }

  }

}
