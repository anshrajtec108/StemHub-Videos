export const API_VERSION = {
    V1: "/v1",
};

export const URLS = {
    //Users end point
    userRegister:"/users/register",
    userLogin:"/users/login",
    userLogout:"/users/logout",
    userRefreshToken:"/users/refresh-token",
    userChangePassword:"/users/change-password",
    userCurrentUser:"/users/current-user",
    userUpdateAvatar:"/users/avatar",
    userUpdateCoverImage:"/users/cover-image",
    userUpdateAccount:"/users/update-account",
    userWatchHistory:"/users/history",
    //
    getUserChannelProfile:"/users/c/",

    //Videos 
    getAllVideos: "/videos/?query=null&sortBy=null&page=null&limit=null&sortType=null&userId=null",//error will come it not initialize properly
    publicTheVideo:"/videos",
    getVideoById:"/videos/",
    updateVideoInfo:"/videos/",

    //Tweet
    createTweet:"/tweets",
    getTweetByUserId:"/tweets/user/",
    updateTweetById:"/tweets/",
    deleteTweet:"/tweets/",

    //Subscription
    subscribe_unsubscribe:"/subscriptions/c/",
    channel_List_subscribed:"/subscriptions/u/",
    subscriber_List_channel:"/subscriptions/c/",

    //PlayList
    createPlaylist:"/playlist",
    getPlatlistChannel_User:"/playlist/user/",
    getPlaylistById:"/playlist",
    updateplaylistInfo:"/playlist/",
    deletePlaylistById:"/playlist/",
    removeVideoPlayList: "/playlist/remove/", //add it /playlist/remove/playlistID/VideoId
    addVideoPlayList: "/playlist/add/", //add it /playlist/remove/playlistID/VideoId

    //Likes
    videoToggleLike:"/likes/toggle/v/",
    TweetToggleLike:"/likes/toggle/t/",
    getAllVideosLikedByUser:"/likes/videos",

    //Histoty
    onPalyVideo:"/histoty/onPlayViedo",

    // dashboard
    getChannelvideoinfo:"/dashboard/videos" //put

}