import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
// import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { compareTime } from "../utils/compareTime.util.js";
import { Video } from "../models/video.model.js";

const ON_PalyVideo =asyncHandler(async(req,res)=>{
    const {videoId}=req.body
    if(!videoId){
        throw new ApiError("400","give the videoId ")
    }
    const userId=req.user?._id
    const video = await Video.findById(new mongoose.Types.ObjectId(videoId))
    if(!video){
        throw new ApiError(400,"the video does not exist")
    }
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
    if(compareTime())
    if(!updateHistory){
        throw new ApiError("500","Error while updateHistory ")
    }
    if (!updateView) {
        throw new ApiError("500", "Error while updateView ")
    }


    return res.status(200)
    .json(new ApiResponse(200,[],"the history and view is updated "))
})
const autoUpdateVideoLikesAndView = asyncHandler(async (req, res,videoId) => {
    //send the data of video and more by using redux toolkit whice is stored in store
  

})

export{
    ON_PalyVideo
}