import { User } from "./User";

export class ArticleContentResponseList{
    videoId: string;
    title:string;
    originalTitle : string;
    thumbnail1:string;
    userId : number;
    isLikeByMe : boolean;
    userDetails : User;
    imagePath : string;
    likeCount : number;
    shareCount : number;
    commentCount : number;
    splitTitle : string[];
    type : string;
    fakelike : number;
    fakeShare : number;
    shareLink : any;
   
}