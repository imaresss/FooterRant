import { UserResponse } from "./UserReponse";
import { ResponseError } from "src/app/ResponseError";


export class UserResponseParent
{
    error: ResponseError;
    data : UserResponse;
}