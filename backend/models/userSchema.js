import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email!"],
    },
    phone: {
        type: String,
        required: true,
        minLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
        maxLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
    },
    nic: {
        type: String,
        required: true,
        minLength: [5, "NIC Must Contain Exact 5 Digits!"],
        maxLength: [5, "NIC Must Contain Exact 5 Digits!"],
    },
    dob: {
        type: Date,
        required: [true, "DOB is required!"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    password: {
        type: String,
        minLength: [8, "Phone Must Contain At Least 8 Characters!"],
        required: true,
        //select :false mtlb jab aap apne user ko get karoge  aap ke paas saari details aa jayegi siwa uske password ki.
        select: false
    },
    // role me user admin hai ya patient hai ye pta karna hai
    role: {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartment: {
        type: String
    },
    docAvatar: {
        public_id: String,
        url: String,
    },
});

//method/function bnana hai, userSchema jab bhi save hoga unko register krega

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { // jab user ka password new aayega to wo kya dekhega
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);  //ye usko update kar de, bcrypt kar de ya hash kar de,
    // means hashed form me password save ho jayega
});

//methods
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
// jab hamara user login krega, ek token bhi generate hona chahiye
userSchema.methods.generateJsonWEbToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User", userSchema);
