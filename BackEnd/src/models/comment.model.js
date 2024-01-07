import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const commentSchema=new Schema(
    {
        content:{
            type:String,
            required:true
        },
        video:{
            type:Schema.type.ObjectId,
            ref:"Video"
        },
        owner:{
            type:Schema.type.ObjectId,
            ref:"User"
        },

    },
    {
        timestamps:true
    }

)
 

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = mongoose.model("Comment",commentSchema)