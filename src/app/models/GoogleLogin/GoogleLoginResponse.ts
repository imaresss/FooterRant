import { UserProfile } from "./UserProfile";


export class GoogleLoginResponse
{
    authToken : string;
    refreshToken : string;
    userProfile : UserProfile;

}