import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    //TODO: create playlist
   if( !name && !description ){
    throw new ApiError(400,"name and description required")
   }
   const playlist=await Playlist.create({
    name,
    description,
    owner:req.user?._id
   })
   if(!playlist){
    throw new ApiError(500,"Something went wrong while creating playlist")
   }
   return res.status(200)
   .json(new ApiResponse(200,playlist,"successfully palyList is created"))
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    // TODO := update the code only send the playlist title description and Frist thumnaile of the video
    const {userId} = req.params
    const playlist_user=await Playlist.aggregate([
        {
            $match:{
                owner: new mongoose.Types.ObjectId(userId)
            } 
        },
         {
            $lookup:{
                from:"videos",
                localField:"videos",
                foreignField:"_id",
                as:"videos",
            }},
            {  $lookup:{
                        from:"users",
                        localField:"owner",
                        foreignField:"_id",
                        as: "owner"
                    }
                },
                {
                    $project: {
                    name:1,
                    description:1,
                    "videos.title":1,
                    "videos.description":1,
                    "videos.thumbnail":1,
                    "videos.videoFile":1,
                    "videos.duration":1,
                    "videos.views":1,
                    "owner.username": 1,
                    "owner.avatar": 1
                }
        },
    ])
    return res.status(200)
    .json(new ApiResponse(200,playlist_user,"successfully get the user playlist"))

})

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    // TODO: get playlist by id
    try {
        const playlistItems = await Playlist.aggregate([
            {
                $match: {
                    _id:new mongoose.Types.ObjectId(playlistId)
                }
            },
            {
                $lookup: {
                    from: "videos",
                    localField: "videos",
                    foreignField: "_id",
                    as: "videos",
                    pipeline: [{
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner"
                        }
                    },]
                }
            },
            
            // {
            //     $unwind:'$owner'
            // },
            {
                $project: {
                    "videos.title": 1,
                    "videos.description": 1,
                    "videos.videoFile": 1,
                    "videos.thumbnail": 1,
                    "videos.duration": 1,
                    "videos.views": 1,
                    "owner.id": 1,
                    "owner.username": 1,
                    "owner.avatar": 1
                }
            }
        ]);

        if (!playlistItems) {
           throw new ApiError(404,  "Playlist not found");
        }

        return res.status(200).json(new ApiResponse(200, playlistItems, "Successfully fetched playlist items"));
    } catch (error) {
        console.error("Error fetching playlist items:", error);
        return res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
    }
});



const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    console.log(playlistId, videoId)
    // const playlist=await Playlist.findById(playlistId)
    const playlist = await Playlist.findOneAndUpdate(
        { _id: playlistId }, 
        { $push: { videos: videoId } }, 
        { new: true }
    )
    if(!playlist){
        throw new ApiError(400,"the playlist not found")
    }
    return res.status(200)
    .json(new ApiResponse(200,playlist,"the video is add to the playlist"))

})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist
    const playlist= await Playlist.updateOne(
        { _id: playlistId },
        { $pull: { videos: videoId } },)
    
    return res.status(200)
    .json(new ApiResponse(200,playlist,"the video is delete from the playlist"))
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    const deletePlaylist=await Playlist.findByIdAndDelete(
        {_id:playlistId},
    )
    return res.status(200)
    .json(new ApiResponse(200,deletePlaylist,"the playlist is deleted"))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    const updatedplaylist=await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $set:{
            name,
            description
        }},
        {new:true}
    )
    return res.status(200)
    .json(new ApiResponse(200,updatedplaylist,"the playlist updated successfully"))
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
