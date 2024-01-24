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
                pipeline:[{
                    
                    $lookup:{
                        from:"users",
                        localField:"owner",
                        foreignField:"_id"
                    }
                },
                    {
                        $project:{
                            username:1,
                            avatar:1
                        }
                    }
                ]
            }
        },
    ])
    return res.status(200)
    .json(new ApiResponse(200,playlist_user,"successfully get the user playlist"))

})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    const playlist_items=await Playlist.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(playlistId)
            }
        },
        {
            
            $lookup:{
                from:"videos",
                localField:"videos",
                foreignField:"_id",
                as:"videos",
                pipeline:[{
                    
                    $lookup:{
                        from:"users",
                        localField:"owner",
                        foreignField:"_id",
                        as:"users"
                    }
                }
                ]
            }
       
        },
        {
            $project:{
                "videos.users.username": 1,
                "videos.users.avatar": 1,
                "videos.title": 1,
                "video.description":1,
                "video.videoFile":1,
                "video.thumbnail":1,
                "video.duration":1,
                "video.views":1, 
            }
        }
    ])
    return res.status(200)
    .json(new ApiResponse(200,playlist_items,"successfully get playlist item using playlist_Id"))
})


const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
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
