import { Injectable, EventEmitter } from '@angular/core';
import { Constants } from './Constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler } from './ErrorHandler';
import { catchError, shareReplay, delay } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { GetContentRequest } from './GetContentRequest';
import { ArticleContentResponse } from './ArticleContentResponse';
import { RegisterRequest } from './models/RegisterRequest';
import { RegisterResponse } from './models/RegisterResponse';
import { RegisteResponseParent } from './models/RegisteResponseParent';
import { GoogleLoginRequest } from './models/GoogleLogin/GoogleLoginRequest';
import { GoogleLoginResponseParent } from './models/GoogleLogin/GoogleLoginResponseParent';
import { PostLikeResponse } from './models/Like/PostLikeResponse';
import { PostLikeRequest } from './models/Like/PostLikeRequest';
import { CommentRequest } from './models/Comment/CommentRequest';
import { PostCommentResponse } from './models/Comment/PostCommentResponse';
import { SinglePostRequest } from './models/SinglePost/SinglePostRequest';
import { SinglePostParentResponse } from './models/SinglePost/SinglePostParentResponse';
import { GetCommentParentResponse } from './models/Comment/GetCommentParentResponse';
import { UserRequest } from './models/User/UserRequest';
import { UserResponseParent } from './models/User/UserResponseParent';
import { PostRantRequest } from './models/PostRant/PostRantRequest';
import { PostRantResponse } from './models/PostRant/PostRantResponse';
import { FbLoginRequest } from './models/FbLogin/FbLoginRequest';
import { FbLoginResponseParent } from './models/FbLogin/FbLoginResponseParent';
@Injectable({
  providedIn: 'root'
})
export class PublishService {

 
  private publishContentUrl = Constants.BASE_URL + '/admin/api/rs/v1/service/publish/content';
  private unPublishContentUrl = Constants.BASE_URL + '/admin/api/rs/v1/service/unpublish/content';
  private getUnPublishedContentUrl = Constants.BASE_URL + '/video/api/rs/v1/service/get/all/';
  private getAllFeedbackUrl = Constants.BASE_URL+ '/video/api/rs/v1/service/get/allfeedback';
  private getAllCommentAbuseUrl = Constants.BASE_URL+'/admin/api/rs/v1/service/get/comment/abuse';
  private deleteCommentAbuseUrl = Constants.BASE_URL+'/admin/api/rs/v1/service/get/delete/comment/abuse'; 
  private logoutUserUrl = Constants.BASE_URL + '/user-management/api/rs/v1/service/logout';
  private getPublishedContentUrlStory = Constants.BASE_URL + '/video/api/rs/v2/service/get/rant/';
  private registerNonLogin = Constants.BASE_URL + '/user-management/api/rs/v1/service/register/uuid';
  private googleLoginUrl = Constants.BASE_URL + '/user-management/api/rs/v1/service/login/google';
  private fbLoginUrl = Constants.BASE_URL + '/user-management/api/rs/v1/service/login/fb';
 
  private postLikeRant = Constants.BASE_URL + '/video/api/rs/v2/service/post/rant/like';
  private postCommentRant = Constants.BASE_URL + '/video/api/rs/v2/service/post/rant/comment';
  private getSinglePost = Constants.BASE_URL + '/video/api/rs/v2/service/get/rant/apost';
  private getCommentPost = Constants.BASE_URL + '/video/api/rs/v2/service/get/rant/comment/';
  private getAllRantNonLoginUrl = Constants.BASE_URL + '/video/api/rs/v2/service/get/rant/nonlogin/';
  private getSinglePostNonLogin = Constants.BASE_URL + '/video/api/rs/v2/service/get/rant/nonlogin/apost';
  private getCommentPostNonLogin = Constants.BASE_URL + '/video/api/rs/v2/service/get/rant/comment/nonlogin/';
  private getUserProfileUrl = Constants.BASE_URL + '/user-management/api/rs/v1/service/get/userprofile';
  private postCommentLikeRant = Constants.BASE_URL + '/video/api/rs/v2/service/post/rant/comment/like';
  private getCommentPostUserid = Constants.BASE_URL + '/video/api/rs/v2/service/get/rant/comment/userid/';
  private postRantUrl = Constants.BASE_URL + '/video/api/rs/v2/service/post/rant/activity';
  private getRantUserid = Constants.BASE_URL + '/video/api/rs/v2/service/get/rant/userid/';
  private postShareRant = Constants.BASE_URL + '/video/api/rs/v2/service/post/rant/share';
  private postCommentShareRant = Constants.BASE_URL + '/video/api/rs/v2/service/post/rant/comment/share';
  private getPreNonLoginRant = Constants.BASE_URL + '/video/api/rs/v2/service/get/rant/pre/nonlogin/';
  private getRantTagLogin = Constants.BASE_URL + '/video/api/rs/v2/service/get/rant/tag/';
  private getRantTagNonLogin = Constants.BASE_URL + '/video/api/rs/v2/service/get/rant/tag/nonlogin/';
  private postRantWithImageUrl = Constants.BASE_URL + '/video/api/rs/v2/service/post/rant/withImage';
  
  constructor(private http: HttpClient) { }

  public getAllPublishedStory(payload: GetContentRequest , pageNo: number): Observable<ArticleContentResponse>{

   
  //   let headers = new HttpHeaders({
  //     'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
  // let options = { headers: headers };
    return this.http.post<ArticleContentResponse>(this.getPublishedContentUrlStory+''+pageNo, payload ).pipe(
      catchError(new ErrorHandler().handleError('uploadContent Article', null))
    );
  }


  public getAllRantTag(payload: GetContentRequest , pageNo: number): Observable<ArticleContentResponse>{

   
    //   let headers = new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
    // let options = { headers: headers };
      return this.http.post<ArticleContentResponse>(this.getRantTagLogin+''+pageNo, payload ).pipe(
        catchError(new ErrorHandler().handleError('uploadContent Article', null))
      );
    }


    public getAllRantTagNonLogin(payload: GetContentRequest , pageNo: number): Observable<ArticleContentResponse>{

   
      //   let headers = new HttpHeaders({
      //     'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
      // let options = { headers: headers };
        return this.http.post<ArticleContentResponse>(this.getRantTagNonLogin+''+pageNo, payload ).pipe(
          catchError(new ErrorHandler().handleError('uploadContent Article', null))
        );
      }

  public getAllRantNonLogin(payload: GetContentRequest , pageNo: number): Observable<ArticleContentResponse>{

    //   let headers = new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
    // let options = { headers: headers };

      return this.http.post<ArticleContentResponse>(this.getAllRantNonLoginUrl+''+pageNo, payload ).pipe(
        catchError(new ErrorHandler().handleError('uploadContent Article', null))
      );
    }

  public registerUUid(payload: RegisterRequest ): Observable<RegisteResponseParent>{

   
    //   let headers = new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
    // let options = { headers: headers };
      return this.http.post<RegisteResponseParent>(this.registerNonLogin, payload ).pipe(
       catchError(new ErrorHandler().handleError('register non login user', null))
      );
    }


    public googleLogin(payload: GoogleLoginRequest ): Observable<GoogleLoginResponseParent>{

   
      //   let headers = new HttpHeaders({
      //     'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
      // let options = { headers: headers };
        return this.http.post<GoogleLoginResponseParent>(this.googleLoginUrl, payload ).pipe(
          catchError(new ErrorHandler().handleError('google login user', null))
        );
      }



    public fbLogin(payload: FbLoginRequest ): Observable<FbLoginResponseParent>{

   
      //   let headers = new HttpHeaders({
      //     'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
      // let options = { headers: headers };
        return this.http.post<GoogleLoginResponseParent>(this.fbLoginUrl, payload ).pipe(
          catchError(new ErrorHandler().handleError('google login user', null))
        );
      }



  public postLike(payload: PostLikeRequest ): Observable<PostLikeResponse>{

   
    //   let headers = new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
    // let options = { headers: headers };
      return this.http.post<PostLikeResponse>(this.postLikeRant, payload ).pipe(
        catchError(new ErrorHandler().handleError('register non login user', null))
      );
    }



  public postShare(payload: PostLikeRequest ): Observable<PostLikeResponse>{

   
    //   let headers = new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
    // let options = { headers: headers };
      return this.http.post<PostLikeResponse>(this.postShareRant, payload ).pipe(
        catchError(new ErrorHandler().handleError('register non login user', null))
      );
    }

    public postCOmmentLike(payload: PostLikeRequest ): Observable<PostLikeResponse>{

   
      //   let headers = new HttpHeaders({
      //     'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
      // let options = { headers: headers };
        return this.http.post<PostLikeResponse>(this.postCommentLikeRant, payload ).pipe(
          catchError(new ErrorHandler().handleError('register non login user', null))
        );
      }


      public postCOmmentShare(payload: PostLikeRequest ): Observable<PostLikeResponse>{

   
        //   let headers = new HttpHeaders({
        //     'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
        // let options = { headers: headers };
          return this.http.post<PostLikeResponse>(this.postCommentShareRant, payload ).pipe(
            catchError(new ErrorHandler().handleError('register non login user', null))
          );
        }

  public postComment(payload: CommentRequest ): Observable<PostCommentResponse>{

   
    //   let headers = new HttpHeaders({
    //     'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
    // let options = { headers: headers };
      return this.http.post<PostCommentResponse>(this.postCommentRant, payload ).pipe(
        catchError(new ErrorHandler().handleError('register non login user', null))
      );
    }

    public getAPost(payload: SinglePostRequest ): Observable<SinglePostParentResponse>{

   
      //   let headers = new HttpHeaders({
      //     'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
      // let options = { headers: headers };
        return this.http.post<SinglePostParentResponse>(this.getSinglePost, payload ).pipe(
          catchError(new ErrorHandler().handleError('register non login user', null))
        );
      }


      public getAPostNonLogin(payload: SinglePostRequest ): Observable<SinglePostParentResponse>{

   
        //   let headers = new HttpHeaders({
        //     'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
        // let options = { headers: headers };
          return this.http.post<SinglePostParentResponse>(this.getSinglePostNonLogin, payload ).pipe(
            catchError(new ErrorHandler().handleError('register non login user', null))
          );
        }

      public getCommentOnPost(payload: CommentRequest , pageNo : number): Observable<GetCommentParentResponse>{

   
        //   let headers = new HttpHeaders({
        //     'Access-Control-Allow-Origin': '*',
        //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
        // let options = { headers: headers };
          return this.http.post<GetCommentParentResponse>(this.getCommentPost +''+pageNo, payload ).pipe(
            catchError(new ErrorHandler().handleError('register non login user', null))
          );
        }


        public getCommentOnPostUserId(payload: CommentRequest , pageNo : number): Observable<GetCommentParentResponse>{

   
          //   let headers = new HttpHeaders({
          //     'Access-Control-Allow-Origin': '*',
          //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
          // let options = { headers: headers };
            return this.http.post<GetCommentParentResponse>(this.getCommentPostUserid +''+pageNo, payload ).pipe(
              catchError(new ErrorHandler().handleError('register non login user', null))
            );
          }

        public getCommentOnPostNonLogin(payload: CommentRequest , pageNo : number): Observable<GetCommentParentResponse>{

   
          //   let headers = new HttpHeaders({
          //     'Access-Control-Allow-Origin': '*',
          //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
          // let options = { headers: headers };
            return this.http.post<GetCommentParentResponse>(this.getCommentPostNonLogin +''+pageNo, payload ).pipe(
              catchError(new ErrorHandler().handleError('register non login user', null))
            );
          }

          public getUserInfo(payload: UserRequest ): Observable<UserResponseParent>{

   
            //   let headers = new HttpHeaders({
            //     'Access-Control-Allow-Origin': '*',
            //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
            // let options = { headers: headers };
              return this.http.post<UserResponseParent>(this.getUserProfileUrl, payload ).pipe(
                catchError(new ErrorHandler().handleError('register non login user', null))
              );
            }



          public postRant(payload: PostRantRequest ): Observable<PostRantResponse>{

   
            //   let headers = new HttpHeaders({
            //     'Access-Control-Allow-Origin': '*',
            //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
            // let options = { headers: headers };
              return this.http.post<PostRantResponse>(this.postRantUrl, payload ).pipe(
                catchError(new ErrorHandler().handleError('register non login user', null))
              );
            }




          public postRantWithImage(payload: FormData ): Observable<PostRantResponse>{

   
            //   let headers = new HttpHeaders({
            //     'Access-Control-Allow-Origin': '*',
            //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
            // let options = { headers: headers };
              return this.http.post<PostRantResponse>(this.postRantWithImageUrl, payload ).pipe(
                catchError(new ErrorHandler().handleError('register non login user', null))
              );
            }

            public getRantOnUserid(payload: GetContentRequest , pageNo: number): Observable<ArticleContentResponse>{

   
              //   let headers = new HttpHeaders({
              //     'Access-Control-Allow-Origin': '*',
              //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
              // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
              // let options = { headers: headers };
                return this.http.post<ArticleContentResponse>(this.getRantUserid+''+pageNo, payload ).pipe(
                  catchError(new ErrorHandler().handleError('uploadContent Article', null))
                );
              }


              public getAllRantPreNonLogin(payload: GetContentRequest , pageNo: number): Observable<ArticleContentResponse>{

   
                //   let headers = new HttpHeaders({
                //     'Access-Control-Allow-Origin': '*',
                //   'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                // 'Access-Control-Allow-Headers':'Origin, Content-Type, X-Auth-Token' });
                // let options = { headers: headers };
                  return this.http.post<ArticleContentResponse>(this.getPreNonLoginRant+''+pageNo, payload ).pipe(
                    catchError(new ErrorHandler().handleError('uploadContent Article', null))
                  );
                }

}
