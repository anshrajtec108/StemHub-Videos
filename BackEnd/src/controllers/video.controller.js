import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    //sorting is pending
    let sortOptions={}
    let basequery={}
    if(sortBy){
        sortOptions[sortBy] = sortType == "desc" ? -1 : 1;
    }
 
    if(query){
        basequery.$or=[
            {title:{$regex : query,$options:"i"}},
            {description:{$regex:query,$options:"i"}}
        ];;
    }

    try {
        const result= await Video.aggregate([
            {
                $match: {
                  $or: [
                    basequery, // This is assuming basequery is already an object with your $or conditions
                    { owner: new mongoose.Types.ObjectId(userId) },
                  ],
                },
              },
            // {
            //   $sort:sortOptions  
            // },
            {
                $skip:(page-1)*limit
            },
            {
                $limit:parseInt(limit)
            },
        ])
        return res.status(200)
        .json(new ApiResponse(200,result,"Success"))
        
    } catch (error) {
        throw new ApiError(500,`something went wrong to get video  ||  ${error.message}`)
    }
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // console.log(req.body)
     console.log(req)

    // TODO: get video, upload to cloudinary, create video
    const videoLocalPath=await req.files?.videoFile[0]?.path
    const thumbnailLocalPath=await req.files?.thumbnail[0]?.path
    console.log(videoLocalPath)
    console.log(thumbnailLocalPath)

    if (!videoLocalPath && !thumbnailLocalPath){
        throw new ApiError(400,"video and thumnail is required")
    }
    const uploadTocloudVideo= await uploadOnCloudinary(videoLocalPath)
    const uploadTocloudthumbnail= await uploadOnCloudinary(thumbnailLocalPath)
    console.log(uploadTocloudVideo)
    console.log(uploadTocloudthumbnail)
    if(!uploadTocloudVideo && !uploadTocloudthumbnail){
        throw new ApiError(500 ,"something went wrong while uploading the video and thumnail ")
    }

    const video= await Video.create({
        videoFile:uploadTocloudVideo.url,
        thumbnail:uploadTocloudthumbnail.url,
        title,
        description,
        duration:uploadTocloudVideo.duration,
        owner:req.user?._id,
        cloudinaryVideoID: uploadTocloudVideo.public_id, //Adding these details to delete  the video from the cloudinary 
        cloudinaryThumbnailID: uploadTocloudthumbnail.public_id,
    })
    if(!video){
        throw new ApiError(500,"something went wrong while creating document in DB ")
    }
    return res.status(200)
    .json(new ApiResponse(200,video,"success video is upladed"))
})  


const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
    const video_L_S_info = await Video.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "channelOwner"
            }
        },
        {
            $lookup:{
                from:"likes",
                localField:"_id",
                foreignField:"video",
                as:"likes"
            }
        },
        {
            $addFields:{
                likesCount:{$size:'$likes'}
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"owner",
                foreignField:'channel',
                as:"subscribers"
            }
        },
        {
            $addFields:{
                subscribersCount: { $size:"$subscribers"}
            }
        },
        {
            $unwind: '$channelOwner'
        },
        {
            $project: {
                videoFile: 1,
                title: 1,
                description: 1,
                views: 1,
                username: '$channelOwner.username', 
                avatar: '$channelOwner.avatar' ,
                channelId:'$channelOwner._id',
                likesCount:1,
                subscribersCount:1
            }
        }
    ]);

    if (!video_L_S_info){
        new ApiError(500,"not get video information")
    }
    return res.status(200)
        .json(new ApiResponse(200, video_L_S_info,"success"))
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const {title,description}=req.body;
    //TODO: update video details like title, description, thumbnail

    let thumbnailLocalPath= await req.file?.path
    // console.log(thumbnailLocalPath)
    const uplodeCthumbnail= await uploadOnCloudinary(thumbnailLocalPath)
    const updatevalue= await Video.findByIdAndUpdate(
        new mongoose.Types.ObjectId(videoId),
        {
            $set:{
               title,
               description,
               thumbnail:uplodeCthumbnail?.url
            }
        },
        {new :true}
        )
    return res.status(200)
    .json(new ApiResponse(200,updatevalue,"success"))

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
