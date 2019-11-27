import { UserProfile } from "./UserProfile";


export class FbLoginResponse
{
    authToken : string;
    refreshToken : string;
    userProfile : UserProfile;

}