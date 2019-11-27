import { GetCommentResponse } from "./GetCommentResponse";

export class GetCommentResponseData{
    list: GetCommentResponse[];
    pageNo: number;
    hasMore: boolean;
}