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
    const {channelId} = req.params
    const listSubscriber=await Subscription.aggregate([
        {
            $match:{
                _id:  new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"subscriber",
                foreignField:"_id",
                as:"Subscriber",
                pipeline:[
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
    if(!listSubscriber){
        throw new ApiError(500,"something went wrong while get the list of subscriber to the channel ")
    }
    console.log("1",listSubscriber)
    return res.status(200)
    .json(new ApiResponse(200,listSubscriber,"successfully get the  list of subscriber to the  channel "))

})
 

// controller to return channel list to which user has subscribed
const  getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    const subscriber_id=await Subscription.find({subscriber:subscriberId || req.user?._id})
    console.log("subscriber_id",subscriber_id)
    //to get the channel 
    const listChannel=await Subscription.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(subscriber_id?._id)}
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"channel",
                foreignField:"_id",
                as:"listchannel",
                pipeline:[
                    {
                        $project:{
                            username:1,
                            avatar:1
                        }
                    }
                ]
            }
        }
    ])
    if(!listChannel){
        throw new ApiError(500,"something went wrong while get the list of channel whice is subscribered by user ")
    }
    console.log("2",listChannel)
    return res.status(200)
    .json(new ApiResponse(200,listChannel[0],"successfully get the  list of channel whice is subscribered by user "))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}