import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
   const {content}=req.body;
   if(!content){
    throw new ApiError(400,"the content is required")
   }
  const tweet= await Tweet.create({
    content,
    owner:req.user?._id
   })
   if(!tweet){
    throw new ApiError(500,"the tweet is not created ")
   }
   return res.status(200)
    .json(new ApiResponse(200,tweet,"succesfully tweet is created"))
})

const getUserTweets = asyncHandler(async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    if(!userId){
        throw new ApiError(400,"the userID not present")
    }
    const tweets=await Tweet.find({owner:userId}).exec()
    if(!tweets){
        throw new ApiError(400,"the user not have any tweets")
    }
    return res.status(200)
    .json(new ApiResponse(200,tweets,"success "))
})

const updateTweet = asyncHandler(async (req, res) => {
    const {content}=req.body;
   const tweetId=new mongoose.Types.ObjectId(req.params.tweetId)
   if(!tweetId){
    throw new ApiError(400,"the tweet ID error or not existe") 
   }
   const updatedTweet= await Tweet.findByIdAndUpdate( 
    tweetId,
    {
        $set:{
            content,
        }
    },
    {new :true})

if(!updateTweet){
    throw new ApiError(500,"the tweet is not updated ")
}
 return res.status(200)
 .json(new ApiResponse(200,updatedTweet,"successfully updated the tweeet "))
})

const deleteTweet = asyncHandler(async (req, res) => {
    const tweetId=new mongoose.Types.ObjectId(req.params.tweetId);
    const deleteTweet=await Tweet.findByIdAndDelete(tweetId)
    res.status(200)
    .json(new ApiResponse(200,deleteTweet,"succesfully the Tweet is deleted"))
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
