import { ResponseError } from "./ResponseError";
import { ArticleContentResponseData } from "./ArticleContentResponseData";

export class ArticleContentResponse{
    error: ResponseError;
    data: ArticleContentResponseData;
}