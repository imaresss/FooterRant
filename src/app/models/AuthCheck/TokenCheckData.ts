import { TokenCheck } from "./TokenCheck";
import { ResponseError } from "src/app/ResponseError";


export class TokenCheckData
{
    error: ResponseError;
    data : TokenCheck;
}