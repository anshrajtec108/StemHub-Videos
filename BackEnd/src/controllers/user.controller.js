import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens=async(userId)=>{
    try {
        const user= await User.findById(userId)
        const accessToken= user.generateAccessToken()
        const refreshToken= user.generateRefreshToken()
        
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})

        return{accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating refresh and access token ")
    }
}

const registerUser = asyncHandler( async (req, res) => {

    const {fullName, email, username, password } = req.body
    console.log("email: ", email);
    
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    console.log(req.files);
    console.log(JSON.stringify(req.files, null, 2));

    let avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log("avatarLocalPath",avatarLocalPath)
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    console.log("coverImageLocalPath",coverImageLocalPath)

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required 1")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is not uploaded to cloud something went wrong  ")
    }
   

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Username or email is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (!user) {
        throw new ApiError(400, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid username or password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    const cookieOptions = {
        httpOnly: true,
        secure: true, // Ensure this is true if you're using HTTPS
        sameSite: 'None', // Required for cross-origin requests
    };

    // Set cookies and send response
    res.status(200)
        .cookie('accessToken', accessToken, cookieOptions)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );
});

export default loginUser;



const logoutUser=asyncHandler(async(req,res)=>{
    console.log(req.user._id)
   await User.findByIdAndUpdate(req.user._id  ,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new:true
        }
        ) 

        
     const option={
        httpOnly:true,
        secure:true
     }

     return res.status(200)
     .clearCookie("accessToken",option)
     .clearCookie("refreshToken",option)
     .json(new ApiResponse(200,{},"User logged out"))
})


const refreshAccessToken=asyncHandler(async(req,res)=>{
     const incomingRefreshToken=req.cookies.refreshToken||req.body.refreshToken
    console.log(incomingRefreshToken)
     if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request")
     }

   try {
     const decodedToken= jwt.verify(incomingRefreshToken,
         process.env.REFRESH_TOKEN_SECRET
         )
     const user=await User.findById(decodedToken?._id)
    console.log("decodedToken",decodedToken)
    console.log("user",user)
     if(!user){
         throw new ApiError(401,"Invaild REFRESH TOKEN ")
      }
 
      if(incomingRefreshToken !==user?.refreshToken){
         throw new ApiError(401,"Refresh token is expired or used")
      }
 
      const option={
         httpOnly:true,
         secure:true
      }
 
       const {accessToken,newrefreshToken}=await generateAccessAndRefreshTokens(user._id)
 
      return res.status(200)
      .cookie("accessToken",accessToken,option)
      .cookie("refreshToken",newrefreshToken,option)
      .json(
         new ApiResponse(200,{accessToken,newrefreshToken}
             , "Access token refreshed")
      )
   } catch (error) {
    console.log(error)
    throw new ApiError(401,error?.message|| "Invaild refresh token")
   }

})

const changeCurrentPassword=asyncHandler(async(req,res)=>{
   const{oldPassword,newPassword}=req.body 
    const user=await User.findById(req.user?._id)
    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid old password")
    }

    user.password= newPassword
    await user.save({validateBeforeSave:false})

    return res.status(200)
    .json(new ApiResponse(200,{},"Password changed successfully "))


})

const getCurrentUser=asyncHandler(async(req,res)=>{
    return res.status(200)
    .json(new ApiResponse(200,req.user,"current user fetched successfully"))
})

const updateAccountDetails= asyncHandler(async(req,res)=>{
   const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }
    const user=await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullName,
                email
            }
        },
        {new:true}
        ).select("-password")
        return res.status(200)
        .json(new ApiResponse(200,user,"Account details updated successfully"))

})
const updateUserAvatar=asyncHandler(async(req,res)=>{
    const avatarLocalPath=req.file?.path
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is missing")
    }

     const avatar=await uploadOnCloudinary(avatarLocalPath)

     if(!avatar.url){
        throw new ApiError(400,"Error while uplading on avatar")
     }

     const user=await User.findByIdAndUpdate(
                            req.user?._id,
                            {
                                $set:{
                                    avatar:avatar.url,
                                }
                            },
                            {new :true}
                            ).select("-password")
    return res.status(200)
    .json(new ApiResponse(200,user,"avatar image updated successfully"))
                    
})

const updateUsercoverImage=asyncHandler(async(req,res)=>{
    console.log(req.file)
    const coverImageLocalPath=req.file?.path
    if(!coverImageLocalPath){
        throw new ApiError(400,"coverImage file is missing")
    }

     const coverImage=await uploadOnCloudinary(coverImageLocalPath)

     if(!coverImage.url){
        throw new ApiError(400,"Error while uplading on coverImage")
     }

     const user=await User.findByIdAndUpdate(
                            req.user?._id,
                            {
                                $set:{
                                    coverImage:coverImage.url,
                                }
                            },
                            {new :true}
                            ).select("-password")
    return res.status(200)
    .json(new ApiResponse(200,user,"cover Image  updated successfully"))
                    
})


const getUserChannelProfile=asyncHandler(async(req,res)=>{
    const {userId}=req.params
    console.log('getUserChannelProfile', userId);
    
    if(!userId?.trim()){
        throw new ApiError(400,"userId is missing")
    }

    const channel=await User.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"channel",
                as:"subscribers"
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"subscriber",
                as:"subscribedTo"
            }
        },
        {
            $addFields:{
                subscribersCount:{
                    $size:"$subscribers"
                },
                channelsSubscribedToCount:{
                    $size:"$subscribedTo"
                },
                issubscribed:{
                    $cond:{
                        if:{$in:[req.user?._id,"$subscribers.subscriber"]},
                        then:true,
                        else:false
                    }
                }
            }
        },
        {
            $project:{
                fullName:1,
                username:1,
                subscribersCount:1,
                channelsSubscribedToCount:1,
                issubscribed:1,
                avatar:1,
                coverImage:1,
                email:1
            }
        }
    ])
    // console.log(channel)
    if(!channel?.length){
        throw new ApiError(404,"channel does not exists")
    }

    return res.status(200)
    .json(
        new ApiResponse(200,channel[0],"user channel fetched successfully")
    )
})

const getWatchHistory=asyncHandler(async(req,res)=>{

    let { page, limit } = req.query;
    console.log('page, limit', page, limit);
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    let skip = (page - 1) * limit;
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $unwind: "$watchHistory" // Unwind the watchHistory array
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
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
                    }
                ]
            }
        }
    ])


    let result =[]
    if (!user || !user[0] || !user[0].watchHistory) {
        result=[]
        // throw new ApiError(500,"User or watch history not found.");
    }else{
        for (let i = 0; i < user.length; i++) {
          result.push(...user[i]?.watchHistory); 
        }
    }
    console.log('history result ', result);
    return res.status(200)
    .json(
        // new ApiResponse(200,user[0].watchHistory,"Watch history fetched successfully")
        new ApiResponse(200, result, "Watch history fetched successfully")

    )
})

const deleteWatchHistory=asyncHandler(async(req,res)=>{
    const {videoId }=req.params
    const userId =req.user?._id
    const watchHistory  = await User.updateOne(
        { _id: userId },
        { $pull: { watchHistory: videoId } },
    )
    console.log('watchHistory', watchHistory);
    return res.status(200).json(new ApiResponse(200, watchHistory,"From Watch-History video deleted  "))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUsercoverImage,
    getUserChannelProfile,
    getWatchHistory,
    deleteWatchHistory,
}