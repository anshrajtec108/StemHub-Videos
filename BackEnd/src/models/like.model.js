import mongoose, { Schema } from "mongoose";

const LikeSchema= new Schema(
    {
        comment:{
            type:Schema.type.ObjectId,
            ref:"Comment"
        },
        video:{
            type:Schema.type.ObjectId,
            ref:"Video"
        },
        likedBy:{
            type:Schema.type.ObjectId,
            ref:"User",
            required:true
        },
        tweet:{
            type:Schema.type.ObjectId,
            ref:"Tweet"
        }
    },{timestamps:true}
)

export const Like=mongoose.model("Like",LikeSchema)