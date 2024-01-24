import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    
     const channel=await User.findById(channelId);
     if(!channel){
        throw ApiError(400,"the channel don't exist")
     }
     console.log(channel?._id)
     const issubscription=await Subscription.findOne({
        subscriber: req.user?._id,
        channel:channelId
     })

    if(issubscription){
        //if we get the Documents it me the user is subscribe  so do it unsubscribe
         const unsubscribe=await Subscription.findByIdAndDelete(issubscription?._id)
         if(!unsubscribe){
            throw new ApiError(500,`something went wrong while unsubscribe`)
         }
         return res.status(200)
         .json(new ApiResponse(200,unsubscribe,"unsubscribe successfully"))
    }else{
         //if we not get the Documents it me the user is unsubscribe  so do it subscribe
         const subscribe=await Subscription.create(
            {
                subscriber: req.user?._id,
                channel:channelId
            }
         )
         if(!subscribe){
            throw new ApiError(500,"something went wrong while subscribe-ing ")
         }
         return res.status(200)
         .json(new ApiResponse(200,subscribe,"subscribe successfully"))
    }
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params

    if(!isValidObjectId(channelId)){
        throw new ApiError(
            400,
            "This channel id is not valid"
        )
    }
    console.log(channelId)

    const subscriptions = await Subscription.aggregate([
        {
            $match: {
                channel: new mongoose.Types.ObjectId(channelId?.trim())
            }
        },
        {
            $lookup:{
                from: "users",
                localField: "subscriber",
                foreignField: "_id",
                as: "subscribers",
            }
        },
        {
            $project:{
                subscribers:{
                    username: 1,
                    avatar: 1
                }
            }
        },
    ])

    console.log(subscriptions[0])

    return res.status(200).json(
        new ApiResponse(
            200,
            subscriptions[0],
            "All user channel Subscribes fetched Successfull!!"
        )
    )


})


// controller to return channel list to which user has subscribed
const  getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    //to get the channel 
    const listChannel=await Subscription.aggregate([
        {
            $match:{
               subscriber: new mongoose.Types.ObjectId(subscriberId || req.user?._id)}
        },
        {
            $lookup:{
                from:"users",
                localField:"channel",
                foreignField:"_id",
                as:"listchannel",
            }
        },
        {
            $project:{
                listchannel:{
                    username:1,
                    avatar:1
            }}
        }
    ])
    if(!listChannel){
        throw new ApiError(500,"something went wrong while get the list of channel whice is subscribered by user ")
    }
    console.log("2",listChannel)
    return res.status(200)
    .json(new ApiResponse(200,listChannel,"successfully get the  list of channel whice is subscribered by user "))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}