import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/errorMiddleware.js";
import {Appointment} from "../models/appointmentSchema.js";
import {User} from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async(req, res, next) =>{
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
    } = req.body;

    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointment_date ||
        !department,
        !doctor_firstName ||
        !doctor_lastName ||
        !address
    ){
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    //isConflict- check karna hai ki same naam ke doctor to nhi hai mere paas....
    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department,
    });
    if(isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found!", 404));
    }
    if(isConflict.length >1) {
        return next(new ErrorHandler("Doctors Conflict! Please Contact Through Email or Phone!", 404));
    }
    const doctorId = isConflict[0]._id;
    const patientId = req.user._id;  // appointment wahi bhej sakega jo authorize ho aur patient ho
    const appointment = await Appointment.create ({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        hasVisited,
        address,
        doctorId,
        patientId
    });
    res.status(200).json({
        success: true,
        message: "Appointment Sent Successfully!",
        appointment,
    })
})
// ab isko test karna hai router me --appointmentRouter.js --

// AB JITNE BHI APPOINTMENT HAIN USKO GET KARNA CHAHTA HU...USKE LIYE EK FUNCTION LIKHENGE
export const getAllAppointments = catchAsyncErrors(async(req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments,
    });
});
// patient ne bahut saare appointment bheje to usko kon dekhega, Admin dekhega kyunki doctor ka panel to bnaya nhi hai

//AB APPOINTMENT KO UPDATE KARNE KE LIYE EK FUNCTION BNAYENGE
export const updateAppointmentStatus = catchAsyncErrors(async(req, res, next) => {
    const { id } = req.params;  //The req.params property is an object containing properties mapped to the named route “parameters”. 
    //For example, if you have the route /student/:id, then the “id” property is available as req.params.id.
    let appointment = await Appointment.findById(id);
    if(!appointment) {
        return next(new ErrorHandler("Appointment Not Found", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new :true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json ({
        success: true,
        message: "Appointment Status Updated!",
        appointment,
    }); // iske jariye baaki cheez ko bhi update kar sakte hain jaise
    // doctor ka appointment ho ya patient ho, doctor ki details apni appointment me update karna ho to kar sakte hain
    // iska setting frontend me karenge , UPDATE ke liye POSTMAN me PUT method hota hai
});

//  ab kisi appointment ko delete kaise kar sakte hain, uske liye function create karna hi

export const deleteAppointment = catchAsyncErrors(async(req, res, next) => {
    const { id } = req.params;  //The req.params property is an object containing properties mapped to the named route “parameters”. 
    //For example, if you have the route /student/:id, then the “id” property is available as req.params.id.
    let appointment = await Appointment.findById(id);

    if(!appointment) {
        return next(new ErrorHandler("Appointment Not Found", 404));
    }
    await appointment.deleteOne(); //delete ke liye
    res.status(200).json ({
        success: true,
        message: "Appointment Deleted!",
    });  // ab router me bhi jaa kar add karna hai
})

