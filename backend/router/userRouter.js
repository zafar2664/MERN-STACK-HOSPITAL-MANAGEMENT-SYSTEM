import express from "express";
import { addNewAdmin, addNewDoctor, getAllDoctors, getUserDetails, login, logoutAdmin, logoutPatient, patientRegister } from "../controller/userController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js";


const router = express.Router();

router.post("/patient/register", patientRegister)
router.post("/login", login); // login karna hai user controller ke baad yaha par
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin); // user controller ke function ko yaha par path diye hain taaki postman me chala sake

router.get("/doctors", getAllDoctors); // /doctors -routes setup
router.get("/admin/me", isAdminAuthenticated, getUserDetails);  //usercontroller.js pe function bna diya iska

router.get("/patient/me", isPatientAuthenticated, getUserDetails); //usercontroller.js pe function bna diya iska
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin); // userConroller ke function ko yaha par use karna hai

router.get("/patient/logout", isPatientAuthenticated, logoutPatient); // userConroller ke function ko yaha par use karna hai, 
//--isPatientAuthenticated-- ye middleware hai, ye success hoga tabhi aage work krega
router.post("/doctor/addnew", isAdminAuthenticated, addNewDoctor);


export default router;