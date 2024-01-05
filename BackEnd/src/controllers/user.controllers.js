import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

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
    //console.log("email: ", email);

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
    //console.log(req.files);

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

    const avatar = await uploadCloudinary(avatarLocalPath)
    const coverImage = await uploadCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required 2")
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

const loginUser=asyncHandler(async(req,res)=>{

    const {email, username, password}=req.body

    if(!username && !email){
        throw new ApiError(400,"username OR password is requird")
    }

    const user=await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(400,"User does not exist")
    }

   const isPasswordVaild= await user.isPasswordCorrect(password)

   if(! isPasswordVaild){
         throw new ApiError(401,"Invalid user credentials // password")
    }

     const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)

     const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

     const option={
        httpOnly:true,
        secure:true
     }
     return res.status(200)
     .cookie("accessToken",accessToken,option)
     .cookie("refreshToken",refreshToken,option)
     .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged In Successfully"
        )
     )
})


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

     if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request")
     }

   try {
     const decodedToken= jwt.verify(incomingRefreshToken,
         process.env.REFRESH_TOKEN_SECRET
         )
     const user=await User.findById(decodedToken?._id)
 
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
 
       const {accessToken,newrefreshToken}=await generateAccessAndRefreshTokens(user._ib)
 
      return res.status(200)
      .cookie("accessToken",accessToken,option)
      .cookie("refreshToken",newrefreshToken,option)
      .json(
         new ApiResponse(200,{accessToken,newrefreshToken}
             , "Access token refreshed")
      )
   } catch (error) {
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
    .json(200,req.user,"current user fetched successfully")
})

const updateAccountDetails= asyncHandler(async(req,res)=>{
    const {fullName,email}=req.user

    if(!fullName || !email){
        throw new ApiError(400,"All fileds are required")
    }
    const user=User.findById(
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

     const avatar=await uploadCloudinary(avatarLocalPath)

     if(!avatar.url){
        throw new ApiError(400,"Error while uplading on avatar")
     }

     const user=await User.findById(
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
    const coverImageLocalPath=req.file?.path
    if(!coverImageLocalPath){
        throw new ApiError(400,"coverImage file is missing")
    }

     const coverImage=await uploadCloudinary(coverImageLocalPath)

     if(!coverImage.url){
        throw new ApiError(400,"Error while uplading on coverImage")
     }

     const user=await User.findById(
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
    
}