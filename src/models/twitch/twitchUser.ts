export class TwitchUser
{
    id:string = "";
    login:string = "";
    displayName:string="";
    description:string="";
    profileImageUrl:string="";
    offlineImageUrl:string="";
    follower:number = 0; // X
    gamename: string = "";
    gameTitle:string = "";
    viewerCount:number = 0;
    startedAt:Date = new Date();
    tags:string[] = [];
    language:string = "";
}