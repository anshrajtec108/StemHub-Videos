import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const ON_PalyVideo =asyncHandler(async(req,res)=>{
    const {videoId}=req.body
    if(!videoId){
        throw new ApiError("400","give the videoId ")
    }
    const userId=req.user?._id
    //TODO : if the videoId is already add to watch history then frist delete it and the push the videoId
    const updateHistory=await User.findOneAndUpdate(
        {_id:userId},
        { $push: { watchHistory : videoId}},
        {new:true}
    )
    const updateView=await Video.findByIdAndUpdate(
        {_id:videoId},
        { $inc: { views: 1 } },
        { new: true } 
    )
    if(!updateHistory){
        throw new ApiError("500","Error while updateHistory ")
    }
    if (!updateView) {
        throw new ApiError("500", "Error while updateView ")
    }
    return res.status(200)
    .json(new ApiResponse(200,[],"the history and view is updated "))
})

export{
    ON_PalyVideo
}