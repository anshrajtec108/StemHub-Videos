import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    
    
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const { userId } = req.params;
    if(!userId){
        throw new ApiError(400,"give the user ID or channel ID ")
    }

    const  videos=await Video.find({owner:userId})
    if(!videos){
        throw new ApiError(500,"  No videos uploded ")
    }
    return res.status(200)
        .json(new ApiResponse(200, videos, "get all videos successfully"))
})

export {
    getChannelStats, 
    getChannelVideos
    }