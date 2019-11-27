import { GetCommentResponse } from "./GetCommentResponse";
import { ResponseError } from "src/app/ResponseError";
import { GetCommentResponseData } from "./GetCommentResponseData";

export class GetCommentParentResponse
{
    error: ResponseError;
    data: GetCommentResponseData;
}