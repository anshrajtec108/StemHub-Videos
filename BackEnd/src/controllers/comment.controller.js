import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {Id} = req.params
    const { page = 1, type = "video" } = req.query
    let limit = 10
    console.log(page,type,Id);
   const response= await Comment.aggregate([
        {
            $match:{
                $and: [{ video: new mongoose.Types.ObjectId(Id) }, { type: type }]
            }
        },
       {
           $sort: { createdAt: -1 }
       },
       {
           $lookup: {
               from: "users",
               localField: "owner",
               foreignField: "_id",
               as: "owner",
               pipeline: [
                   {
                       $project: {
                           fullName: 1,
                           username: 1,
                           avatar: 1
                       }
                   }
               ]
           }
       },
       {
           $addFields: {
               owner: {
                   $first: "$owner"
               }
           }
       },
       {
           $skip: (page - 1) * limit
       },
       {
           $limit: parseInt(limit)
       },

    ])

    if(!response){
        throw new ApiError(500, "something went wrong while get all comments")
    }
    // console.log("comment get ",response)
    return res.status(200).json(new ApiResponse(200, response, "the comment is Successfully get all comments "))
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const { Id } = req.params
    const { content }=req.body
    const { type ="video"} = req.query
    if (!Id || !content){
        throw ApiError(400,"the id and Data is required")
    }
    let response;
    if (type ==="video"){
    response=await Comment.create({
        content,
        type:type,
        video:Id,
        owner: req.user?._id
    })}
    else {
        response = await Comment.create({
            content,
            type: type,
            tweet: Id,
            owner:req.user?._id
    })}

    const result = await Comment.aggregate([
        {
            $match: {
                _id:new mongoose.Types.ObjectId(response?._id)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        },
    ])
    if (!result){
        throw new ApiError(500,"something went wrong while adding comment  ")
    }
    return res.status(200).json(new ApiResponse(200, result,"the comment is Successfully added "))
})
const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const { commentId }=req.params;
    const {UpdatedContent}=req.body;

    if(!commentId || !UpdatedContent){
        throw new ApiError(400,"provide the information")
    }

    const response=await Comment.findByIdAndUpdate(
        {_id:commentId},
        { $set: {content:UpdatedContent}},
        {new:true}
    )
    if (!response) {
        throw new ApiError(500, "something went wrong while updating comment  ")
    }
    return res.status(200).json(new ApiResponse(200, response, "the comment is Successfully updated "))
    
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const { commentId } = req.params;
    if (!commentId) {
        throw ApiError(400, "the id is required")
    }
    const response=await Comment.findByIdAndDelete({_id:commentId})

    return res.status(200).json(new ApiResponse(200, response, "the comment is Successfully deleted "))

})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
