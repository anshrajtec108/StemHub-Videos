import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const recommendation = asyncHandler(async (req, res) => {
    let userId;
    if (req.user && req.user._id) {
        userId = req.user._id;
    }

    let { page, limit } = req.query;
    // console.log('page, limit', page, limit);
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 2;

    let latestVideos, popularVideos, recommendationsResult;

    if (userId) {
        // Get user's watch history if user is authenticated
        let user = await User.findById(userId).populate('watchHistory');
        let watchHistory = user ? user.watchHistory.map(video => video._id) : [];

        // Define pagination options
        let skip = (page - 1) * limit;

        // Get personalized recommendations based on watch history with pagination
        recommendationsResult = await Video.aggregate([
            {
                $match: {
                    _id: { $nin: watchHistory },
                    isPublise: true
                }
            },
            {
                $skip: skip // Assuming skip is a numeric value
            },
            {
                $limit: limit // Assuming limit is a numeric value
            },
            {
                $lookup: {
                    from: "users",
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'owner'
                }
            },
            {
                $unwind: '$owner' // If each video has only one owner
            },
            {
                $project: {
                    title: 1,
                    thumbnail: 1,
                    description: 1,
                    duration: 1,
                    views: 1,
                    createdAt: 1,
                    'owner._id':1,
                    'owner.username': 1,
                    'owner.avatar': 1
                }
            }
        ]);

       
    }

    // Redefine pagination options outside the if block
    let skip = (page - 1) * limit;

   
    latestVideos = await Video.aggregate([
        {
            $match: { isPublise: true }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $skip: skip // Assuming skip is a numeric value
        },
        {
            $limit: limit // Assuming limit is a numeric value
        },
        {
            $lookup: {
                from: "users",
                localField: 'owner',
                foreignField: '_id',
                as: 'owner'
            }
        },
        {
            $unwind: '$owner' // If each video has only one owner
        },
        {
            $project: {
                title: 1,
                thumbnail: 1,
                description: 1,
                duration: 1,
                views: 1,
                createdAt: 1,
                'owner._id':1,
                'owner.username': 1, 
                'owner.avatar': 1 
            }
        }
    ]);

  
    popularVideos = await Video.aggregate([
        {
            $match: { isPublise: true }
        },
        {
            $sort: { views: -1 }
        },
        {
            $skip: skip
        },
        {
            $limit: limit 
        },
        {
            $lookup: {
                from: "users",
                localField: 'owner',
                foreignField: '_id',
                as: 'owner'
            }
        },
        {
            $unwind: '$owner' // If each video has only one owner
        },
        {
            $project: {
                title: 1,
                thumbnail: 1,
                description: 1,
                duration: 1,
                views: 1,
                createdAt: 1,
                'owner._id':1,
                'owner.username': 1,
                'owner.avatar': 1
            }
        }
    ])
    const allVideos = [...popularVideos, ...latestVideos, ...recommendationsResult];
    const filterUniqueVideos = (videos) => {
        const uniqueVideosMap = new Map();
        videos.forEach(video => uniqueVideosMap.set(video._id.toString(), video));
        return Array.from(uniqueVideosMap.values());
    };

    // Filter out duplicate videos from allVideos array
    const filteredAllVideos = filterUniqueVideos(allVideos);

    // Respond with the filtered allVideos array
    return res.status(200).json({ success: true, allVideos: filteredAllVideos });
});


const  getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    //sorting is pending
    let sortOptions={}
    let basequery={}
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    if(sortBy){
        sortOptions[sortBy] = sortType == "desc" ? -1 : 1;
    }
    //  /$options:"i"
    if (query) {
        // Escape special characters in the query
     

        // Add the regular expression pattern to the base query
        basequery.$or = [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } }
        ];
    }
    console.log('basequery', query );
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
            {
              $sort:sortOptions  
            },
            {
                $lookup: {
                    from: "users",
                    localField: 'owner',
                    foreignField: '_id',
                    as: 'owner'
                }
            },
            {
                $unwind: '$owner' // If each video has only one owner
            },
            {
                $skip:(page-1)*limit
            },
            {
                $limit:parseInt(limit)
            },
            {
                $project: {
                    title: 1,
                    thumbnail: 1,
                    description: 1,
                    duration: 1,
                    views: 1,
                    createdAt: 1,
                    'owner._id':1,
                    'owner.username': 1,
                    'owner.avatar': 1
                }
            }
        ])
        console.log('result search', result);
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
                userId:'$channelOwner._id',
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
    togglePublishStatus,
    recommendation
}
