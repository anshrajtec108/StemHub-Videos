import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    //TODO: toggle like on video
    const isliked=await Like.findOne({video:videoId,likedBy:req.user?._id})
   console.log(isliked)
    if(isliked){
        const unlikeThevideo=await Like.findByIdAndDelete(isliked?._id)
        return res.status(200)
        .json(new ApiResponse(200,unlikeThevideo,"the video is un-liked")) 
    }
    else{
    const likeThevideo=await Like.create({
        video:videoId,
        likedBy:req.user?._id
    })
    // console.log(likeThevideo)
    if(! likeThevideo){
        throw new ApiError(500,"something went wrong while video like ")
    }
    return res.status(200)
    .json(new ApiResponse(200,likeThevideo,"the video is liked"))}

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    //TODO: toggle like on comment
    const iscommentliked=await Like.findOne({comment:commentId,likedBy:req.user?._id})
    if(iscommentliked){
        const unlikeThecomment=await Like.findByIdAndDelete(iscommentliked?._id)
        return res.status(200)
        .json(new ApiResponse(200,unlikeThecomment,"the comment is liked")) 
    }
    else{
    const likeThecomment=await Like.create({
        comment:commentId,
        likedBy:req.user?._id
    })
    return res.status(200)
    .json(new ApiResponse(200,likeThecomment,"the comment is liked"))}
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    //TODO: toggle like on tweet
    const istweetliked=await Like.findOne({tweet:tweetId,likedBy:req.user?._id})
    if(istweetliked){
        const unLikeTheTweet=await Like.findByIdAndDelete(istweetliked?._id)
        return res.status(200)
        .json(new ApiResponse(200,unLikeTheTweet,"the tweet is unliked"))
    }else{
        const likedthetweet=await Like.create({
            tweet:tweetId,
            likedBy:req.user?._id
        })
        res.status(200)
        .json(new ApiResponse(200,likedthetweet,"the tweet is liked "))
    }
}
)

const getLikedVideos = asyncHandler(async (req, res) => {
    //TODO: get all liked videos
    //pending write a aggregate pipeline to return the video info like title ,desr, etc 
    const findTheVideoLiked = await Like.find({ video: { $ne: null } });
    res.status(200)
    .json(new ApiResponse(200,findTheVideoLiked,"get all videos which was liked"))
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}