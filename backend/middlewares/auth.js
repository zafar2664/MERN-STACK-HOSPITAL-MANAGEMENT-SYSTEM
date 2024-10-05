import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";


export const isAdminAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.adminToken; //sabse pehle admin token ko get kiya
    if(!token){  // agar token nhi milega tab error dena hai
        return next(new ErrorHandler("Admin Not Authenticated!", 400));
    }
    // line 13 and 14 for authentication , line 15 to 21 is for authorization
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // token milne ke baad verify karna hai ki humne hi generate kiya hai or website ne
    req.user = await User.findById(decoded.id);  //userSchema me jo id diye hain usi get kar rahe hain
    if(req.user.role !== "Admin") {  // agar user ka role admin ke barabar nhi hua
        return next (
            new ErrorHandler(
                `${req.user.role} not authorized for this resources!`, 403
            )  // ye msg show karna hai
        );
    }
    next();
});

export const isPatientAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.patientToken; //sabse pehle admin token ko get kiya
    
    if(!token){  // agar token nhi milega tab error dena hai
        return next(new ErrorHandler("patient Not Authenticated!", 400));
    }
    // line 13 and 14 for authentication , line 15 to 21 is for authorization
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // token milne ke baad verify karna hai ki humne hi generate kiya hai or website ne
    req.user = await User.findById(decoded.id);  //userSchema me jo id diye hain usi get kar rahe hain
    if(req.user.role !== "Patient") {  // agar user ka role admin ke barabar nhi hua
        return next (
            new ErrorHandler(
                `${req.user.role} not authorized for this resources!`, 403
            )  // ye msg show karna hai
        );
    }
    next();
});