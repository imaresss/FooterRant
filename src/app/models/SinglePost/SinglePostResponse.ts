import { User } from "src/app/User";


export class SinglePostResponse
{
    videoId: string;
    title:string;
    originalTitle : string;
    thumbnail1:string;
    userId : number;
    isLikeByMe ?: boolean;
    userDetails : User;
    imagePath : string;
    likeCount : number;
    shareCount : number;
    commentCount : number;
    splitTitle : string[];
    type : string;
}