export class GetCommentResponse
{
    commentId : string;
    videoId : string;
    commenterId : number;
    comment : string;
    originalComment : string;
    commenterFirstName : string;
    commenterLastName : string;
    commenterPicUrl : string;
    likeCount : number;
    replyCount : number;
    creationDate : number;
    anonymous : boolean;
    shareCount : number;
    isLikeByMe : boolean;
    splitComment : string[];
}