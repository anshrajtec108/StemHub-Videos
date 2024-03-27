import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const channelStats = await User.aggregate([
        
        {
            $lookup: {
                from: "videos",
                localField: "_id",
                foreignField: "owner",
                as: "allVideos",
            },
        },
        {
            $unwind: "$allVideos" // Unwind the videos array
        },
        {
            $lookup: {
                from: "likes",
                localField: "allVideos._id",
                foreignField: "video",
                as: "likes",
            },
        },
        {
            $addFields: {
                likesCount: { $size: "$likes" },
            },
        },
        {
            $group: {
                _id: "$_id",
                allVideos: { $push: "$allVideos" }, // Reassemble the videos array
                totalLikes: { $sum: "$likesCount" }, // Calculate total likes
                totalViews: { $sum: "$allVideos.views" }, // Calculate total views
            },
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers",
            },
        },
        {
            $addFields: {
                totalSubscribers: { $size: "$subscribers" },
                totalVideos: { $size: "$allVideos" }, // Count total videos
            },
        },
        {
            $project: {
                totalVideos: 1,
                totalViews: 1,
                totalLikes: 1,
                totalSubscribers: 1,
                username: 1,
                fullName: 1,
                avatar: 1,
                coverImage: 1,
            },
        },
    ]);

    if (channelStats.length < 1) {
        throw new ApiError(400, "Channel not found");
    }

    return res.status(200).json(
        new ApiResponse(200, channelStats[0], "Channel stats retrieved successfully")
    );

})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const { userId } = req.params;
    if(!userId){
        throw new ApiError(400,"give the user ID or channel ID ")
    }
    const videoInfo=await Video.aggregate([
        {
            $match:{
                owner:new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $project:{
                title:1,
                thumbnail:1,
                duration:1,
                updatedAt:1
            }
        }
    ])
    if(!videoInfo){
        new ApiError(500,"Not video uploaded")
    }
    return res.status(200).json(
        new ApiResponse(200, videoInfo, "Channel video's retrieved successfully")
    );
})
    

export {
    getChannelStats, 
    getChannelVideos
    }