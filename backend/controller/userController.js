import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import {generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary";


export const patientRegister = catchAsyncErrors(async(req, res, next) => {
    const {firstName,
           lastName,
           email,
           phone, 
           password, 
           gender, 
           dob, 
           nic, 
           role,
    } =  req.body;
    if(!firstName ||
        !lastName ||
        !email  ||
        !phone || 
        !password  ||
        !gender ||
        !dob ||
        !nic || 
        !role 

         ){
            return next(new ErrorHandler("Please Fill Full Form!", 400));
         }
         let user = await User.findOne({email}); //user model ke andar dhundho ye email exist karti hai ya nhi
         if(user){
            return next(new ErrorHandler("User Already Registered", 400));
         }
         //but agar user registered nhi hai to
         user = await User.create({
           firstName,
           lastName,
           email,
           phone, 
           password, 
           gender, 
           dob, 
           nic, 
           role,
         });
         generateToken(user, "User Registerd!", 200, res); // 200-status
});

export const login = catchAsyncErrors(async(req, res, next) => {
    //ab yaha par body me se kuchh get karna chahenge
    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new ErrorHandler("Please Provide All Details!", 400));
    }
    // agar password and confirm password match nhi kiya to dubara msg karo
    if(password !== confirmPassword){
        return next(new ErrorHandler("Password And Confirm Password Do Not Match!", 400));
    }
    const user = await User.findOne({email}).select("+password"); // yaha par select ka mtlb hai jaha false kiye hain jaise password, 
    //usko kaise get krenge select se
    //findOne se user ke email ya kisi aur cheez ko find karte hain

    if(!user){  // agar user nhi milta hai to ek msg de denge
        return next(new ErrorHandler("Invalid Password Or Email!", 400));
    }

    //ab password ko match karwana hai kyunki hamare user ka jo password hai wo hash ho chuka hai
    const isPasswordMatched = await user.comparePassword(password); // userSchema se comparePassword aaya hai
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password Or Email!", 400));
    }
    // ab role ko match karwana hai
    if(role !== user.role){
        return next(new ErrorHandler("User With This Role Not Found!", 400));
    }
    // ab agar user role ke sath bhi match kar gya, fir res kar dena hai
    //res.status(200).json({
      //  success: true,
      //  message: "User Logged In Succesfully!",
    // });
    generateToken(user, "User Login Successfully!", 200, res);

});

// ab ek ADD NEW ADMIN ka function bnana hai

export const addNewAdmin = catchAsyncErrors(async(req, res, next) => {
    const { firstName, lastName, email, phone, password, gender, dob, nic } = req.body;
    if(!firstName ||
        !lastName ||
        !email  ||
        !phone || 
        !password  ||
        !gender ||
        !dob ||
        !nic

    ) {
            return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    // ab check krenge ki ye admin register to nahi hai
    const isRegistered = await User.findOne({email});
    if(isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`));
    }
    // agar admin nahi mila to humlog simply ek admin ko add kar denge data base me
    const admin = await User.create({firstName, lastName, email, phone, password, gender, dob, nic, role:"Admin", }); // role ke liye static value jo fix hai de diye
    res.status(200).json({
        success: true,
        message: "New Admin Registered!",
    });
});

//ab jitne bhi doctor hamare pass registered hain un sab ko aap get karo
// agar koi doctor register nhi hua hai to empty array de dega

export const getAllDoctors = catchAsyncErrors(async(req, res, next) => {
    const doctors = await User.find({role: "Doctor"});
    res.status(200).json({
        success: true,
        doctors,
    })
})
//ab ek function create karna hai User ki jitni details hai usko get karne ke liye
export const getUserDetails = catchAsyncErrors(async(req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});
// ab userRouter me jaa kar setup karna hai

//ab 2 logout function create karna hai, ek ADMIN ke liye aur ek PATIENT ke liye, kyunki multiple token ke sath kaam kar rahe hain
//ADMIN LOGOUT
export const logoutAdmin = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("adminToken", "", {
        httpOnly: true, // jwtToken.js me bhi ye dena hai
        expires: new Date(Date.now()),
        secure: true,
        sameSite: "None"
    }).json({
        success: true,
        message: "Admin Logged Out Successfully!",
    });
}); // ab isko use karna hai userRouter.js me work kar rha hai ya nahi

//PATIENT LOGOUT
export const logoutPatient = catchAsyncErrors(async(req, res, next) => {
    res.status(200).cookie("patientToken", "", {
        httpOnly: true, // jwtToken.js me bhi ye dena hai
        expires: new Date(Date.now()),
        secure: true,
        sameSite: "None"
    }).json({
        success: true,
        message: "Patient Logged Out Successfully!",
    });
}); // ab isko use karna hai userRouter.js me work kar rha hai ya nahi

// ADD NEW DOCTOR Function
export const addNewDoctor = catchAsyncErrors(async(req, res, next) => {
    if(!req.files || Object.keys(req.files).length === 0){ //agar req.files nhi hui ya 
        //req.files ki length 0 hui to Doctor Avatar Required! true karna hai
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    const {docAvatar} = req.files; // remember jo naam yaha likhe ho wahi naam frontend par bhi likhna hai, nhi to error aayega
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)) {  // mimetype uski extension ko match karega jaise jpeg, png, webp etc
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }
    const {
           firstName,
           lastName,
           email,
           phone, 
           password, 
           gender, 
           dob, 
           nic, 
           doctorDepartment // userSchema se aaya
    } = req.body;
    if(
        (
        !firstName ||
        !lastName ||
        !email  ||
        !phone || 
        !password  ||
        !gender ||
        !dob ||
        !nic ||
        !doctorDepartment
        )
    ){
        return next(new ErrorHandler("Please Provide Full Details!", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400));
    }

    // Ab Cloudinary par image ko post karenge
    //upar clodinary ko import karna hai
    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
    );
    if(!cloudinaryResponse || cloudinaryResponse.error) {
        console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary Error"
        );
    }
    const doctor = await User.create({
        firstName,
           lastName,
           email,
           phone, 
           password, 
           gender, 
           dob, 
           nic, 
           doctorDepartment,
           role: "Doctor",
           docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
           },
    });
    res.status(200).json({
        success: true,
        message: "New Doctor Registered!",
        doctor
    });  // ab userRouter me jaa kar new doctor ko add karna hai
});

