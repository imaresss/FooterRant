import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PublishService } from 'src/app/services/publish.service';
import { SinglePostRequest } from 'src/app/models/SinglePost/SinglePostRequest';
import { SinglePostResponse } from 'src/app/models/SinglePost/SinglePostResponse';
import { CommentRequest } from 'src/app/models/Comment/CommentRequest';
import { GetCommentResponse } from 'src/app/models/Comment/GetCommentResponse';

import { AuthCheckService } from 'src/app/services/auth-check.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';
import { PostLikeRequest } from 'src/app/models/Like/PostLikeRequest';
import { DomSanitizer } from '@angular/platform-browser';

// declare function  singleRantIt(): any;
declare function homePage(page: string): any;
@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SinglePostComponent implements OnInit, OnDestroy {
  private sub: any;
  rantId: string;
  singlePostRequest: SinglePostRequest;
  singlePostData: SinglePostResponse;
  commentRequest: CommentRequest;
  commentResponse: GetCommentResponse[];
  postLike: PostLikeRequest;
  finished = false;
  isVisible: Boolean;
  inputValue: string
  postComment: CommentRequest;
  hashTags: string[];
  hashTagsNew: string[];
  constructor(private router: ActivatedRoute, private route: Router, private authService: AuthCheckService,
    private publishService: PublishService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private cookieService: CookieService, public sanitizer: DomSanitizer) { }
  pageNo = 1;

  ngOnInit() {

    this.commentResponse = new Array<GetCommentResponse>();
    this.sub = this.router.params.subscribe(params => {
      this.rantId = params['videoId']; // (+) converts string 'id' to a number
      //  console.log("the rant id is in new comp is "+ this.rantId)


      this.authService.checkIfLoginNonLogin();
      //  console.log("the logged in sttus is "+this.cookieService.get('logged'))
      if (this.cookieService.get('logged') == 'true' || this.storage.get("authToken") != null)
        this.getAPost(this.rantId);
      else
        this.getAPostNonLogin(this.rantId);


      // In a real app: dispatch action to load the details here.
    });

    homePage('web_screen_single_rant');
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  check(): void {
    if (this.cookieService.get('logged') == 'false') {

      this.authService.checkLoggedIn();
    }
  }

  getAPostNonLogin(rantId: string): void {
    this.singlePostRequest = new SinglePostRequest();
    this.singlePostRequest.videoId = rantId;
    this.singlePostRequest.authToken = this.storage.get('nonLoginAuth');
    this.rantId = rantId;
    this.publishService.getAPostNonLogin(this.singlePostRequest).subscribe(singlePostResponse => {

      if (singlePostResponse.error != null) {
        //   alert(singlePostResponse.error.errorMsg);
        this.authService.logout();
        return;
      }

      this.singlePostData = singlePostResponse.data.userFeed;
      if (this.singlePostData.isLikeByMe) {
        this.singlePostData.imagePath = "heartit.svg";
      }
      else {
        this.singlePostData.imagePath = "heart.svg";
      }
      // console.log("the data is "+ this.singlePostData.videoId);

    })
    this.getCommentOnPostNonLogin(rantId, 1);
  }


  getAPost(rantId: string): void {

    this.singlePostRequest = new SinglePostRequest();
    this.singlePostRequest.videoId = rantId;
    this.singlePostRequest.authToken = this.storage.get('authToken');
    this.rantId = rantId;
    this.publishService.getAPost(this.singlePostRequest).subscribe(singlePostResponse => {

      if (singlePostResponse.error != null) {
        this.authService.logout();
        // alert(singlePostResponse.error.errorMsg);
        return;
      }

      this.singlePostData = singlePostResponse.data.userFeed;

      if (this.singlePostData.isLikeByMe) {
        this.singlePostData.imagePath = "heartit.svg";
      }
      else {
        this.singlePostData.imagePath = "heart.svg";
      }
      //  console.log("the data is "+ this.singlePostData.videoId);

    })
    this.getCommentOnPost(rantId, 1);
  }

  rantLike(rantId, like) {
    if (this.cookieService.get('logged') == 'true' || this.storage.get("authToken") != null) {
      this.singlePostData.isLikeByMe = like
      if (this.singlePostData.isLikeByMe) {
        this.singlePostData.imagePath = "heartit.svg";
      }
      else {
        this.singlePostData.imagePath = "heart.svg";
      }
      // console.log(rantId + " rantid is ")
      //console.log("like or not "+ like)
      this.authService.checkAuthValidity()
      this.postLike = new PostLikeRequest();
      this.postLike.like = like;
      this.postLike.videoId = rantId;
      this.postLike.authToken = this.storage.get('authToken');
      this.publishService.postLike(this.postLike).subscribe(likeResponse => {

        if (likeResponse.error != null) {
          //alert(likeResponse.error.errorMsg);
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
    if (this.cookieService.get('logged') == 'true' || this.storage.get("authToken") != null) {
      this.rantId = rantId;
      this.isVisible = true
    }
  }

  handleCancel(): void {
    this.isVisible = false;
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

        window.location.reload();
      })
    }
  }

  takeOutTagsFromInput(input: string): string {
    const matchHashtags = /(#\w+) ?/g;
    let hashtag;
    this.hashTags = new Array<string>();
    while ((hashtag = matchHashtags.exec(input))) {
      //  console.log("hashtags are "+ hashtag[1])
      this.hashTags.push(hashtag[1]);
    }

    // console.log("length is "+ this.hashTags.length)
    var megaString = "";


    this.hashTagsNew = new Array<string>();
    this.hashTags.forEach(element => {
      //  console.log("each hastag is "+ element)
      this.hashTagsNew.push("<a href='/hashtag/" + element + "'  class = 'tag inactiveLink' >" + element + " </a>")
      // var str = this.content.split(element);
      // console.log(str)
    });

    for (var i = 0; i < this.hashTags.length; i++) {
      //console.log("old tags  "+ this.hashTags[i])
      // console.log("new tags  "+ this.hashTagsNew[i])
      input = input.replace(this.hashTags[i], this.hashTagsNew[i]);
      //       console.log("new content is "+ input)
    }
    //console.log("new content is "+ input)


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

  getCommentOnPost(rantId: string, pageNo: number) {
    this.commentRequest = new CommentRequest();
    this.commentRequest.videoId = rantId;
    this.commentRequest.authToken = this.storage.get('authToken')
    this.publishService.getCommentOnPost(this.commentRequest, pageNo).subscribe(response => {


      if (response.error != null) {
        //   alert(response.error.errorMsg);
        this.authService.logout();
        return;
      }

      if (response.data.list.length == 0) {
        //  console.log(this.finished)
        this.finished = true
      }

      this.commentResponse = this.commentResponse.concat(response.data.list);
      //console.log("comment is " + this.commentResponse[0].comment)


    })
  }


  getCommentOnPostNonLogin(rantId: string, pageNo: number) {
    this.commentRequest = new CommentRequest();
    this.commentRequest.videoId = rantId;
    this.commentRequest.authToken = this.storage.get('nonLoginAuth')
    this.publishService.getCommentOnPostNonLogin(this.commentRequest, pageNo).subscribe(response => {


      if (response.error != null) {
        //  alert(response.error.errorMsg);
        this.authService.logout();
        return;
      }

      if (response.data.list.length == 0) {
        //  console.log(this.finished)
        this.finished = true
      }

      this.commentResponse = this.commentResponse.concat(response.data.list);
      //console.log("comment is " + this.commentResponse[0].comment)


    })
  }

  rantCommentLike(commentId, rantId, like, index): void {
    if (this.cookieService.get('logged') == 'true' || this.storage.get("authToken") != null) {
      this.commentResponse[index].isLikeByMe = like
      this.postLike = new PostLikeRequest();
      this.postLike.like = like;
      this.postLike.videoId = rantId;
      this.postLike.commentId = commentId;
      this.postLike.authToken = this.storage.get('authToken');


      this.publishService.postCOmmentLike(this.postLike).subscribe(likeResponse => {

        if (likeResponse.error != null) {
          //alert(likeResponse.error.errorMsg);
          this.authService.logout();
          return;
        }

      });
    }

  }



  whatsApp(title, videoId): void {
    title = title.replace(/#/g, '');
    title = title.replace(/'/g, '');

    title = title.replace(/"/g, '');
    window.open("https://api.whatsapp.com/send?text=" + title + "     " + "Shared via http://staging.footerrant.com:8080/thisPost/" + videoId + " : World's biggest community of football fans")


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
        this.authService.logout();
        // alert(response.error);
      }
    });


  }


  shareComment(rantId: string): void {
    this.postLike = new PostLikeRequest();
    if (this.storage.get("authToken") == null)
      this.postLike.authToken = this.storage.get("nonLoginAuth");
    else
      this.postLike.authToken = this.storage.get("authToken");
    this.postLike.videoId = rantId;

    this.publishService.postCOmmentShare(this.postLike).subscribe(response => {

      if (response.error != null) {
        this.authService.logout();
        // alert(response.error);
      }
    });


  }



  onScroll() {
    //console.log("scrolled Down");

    this.pageNo = this.pageNo + 1

    if (this.cookieService.get('logged') == 'true' || this.storage.get("authToken") != null)
      this.getCommentOnPost(this.rantId, this.pageNo);
    else
      this.getCommentOnPostNonLogin(this.rantId, this.pageNo);
  }


}
