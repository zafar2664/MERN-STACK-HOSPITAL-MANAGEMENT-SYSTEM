//import { User } from "../models/userSchema";

export const generateToken = (user, message, statusCode, res)=> {
    const token = user.generateJsonWEbToken();
    // ab cookie ka naam dena hai, kyunki hamare pass 2 frontend hone wala hai,1admin dashboard 2nd frontend
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken"; // agar user ka role admin hua to admin token generate karna hai 
    //nhi to patienttoken genertae karega
    res.status(statusCode).cookie(cookieName, token, {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: true,
        sameSite: "None"
    }).json({
        success : true,
        message,
        user,
        token,
    });


};