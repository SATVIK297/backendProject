import { asyncHandle } from "../utils/asyncHandle.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandle(async (req, res) => {
  //get user details from frontend ie refer usermodel
  //validation of all format like email and not empty fields
  //check if user already existed : username ,email unique
  //check for images and avatar
  //upload them to cloudinary , avatar check
  //create user object - create entry in db
  //remove password and refresh token fields from response
  //check for user creating
  //return response else error

  //we can get user details from req.body

  const { fullName, email, username, password } = req.body;
  console.log("email", email, "password", password);

  // if(fullName===""){
  //   throw new ApiError(400 , "fullname is required")
  // }

  //but we need to check all elements

  if ([fullName, email, username, password].some((i) => i?.trim() === "")) {
    throw new ApiError(404, "all fields are required");
  }
  if (!email.includes("@")) {
    throw new ApiError(404, " incorrect email");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "user already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user  = await User.create({
    fullName : fullName,
    avatar: avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    username : username.toLowerCase()
  })
  const createduser =await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createduser){
    throw new ApiError(500, "something went wrong while creting user ")
  }
  return res.status(201).json({
    apiResponse: new apiResponse(200, createdUser, "User registered successfully")
  });
  
});

export { registerUser };
