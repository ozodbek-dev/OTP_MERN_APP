import {Router} from 'express'

// Import all controllers
import * as ctrl from '../controllers/appController.js';
import verifyUser from "../middleware/middlewareVerifyUser.js";
import Auth, {localVariables} from '../middleware/auth.js'
import {registerMail} from "../controllers/mailer.js";


const router = Router();


//POST METHODS
router.route("/register").post(ctrl.register)
router.route("/registerMail").post(registerMail)
router.route("/authenticate").post((req, res) => res.end())
router.route("/login").post(verifyUser, ctrl.login)


// Get Methods
router.route("/user/:username").get(ctrl.getUser)
router.route("/generateOTP").get(verifyUser, localVariables, ctrl.generateOTP)
router.route("/verifyOTP").get(ctrl.verifyOTP)
router.route("/createResetSession").get(ctrl.createResetSession)


// Putt Methods
router.route("/updateUser").put(Auth, ctrl.updateUser)
router.route("/resetPassword").put(verifyUser,ctrl.resetPassword)

export default router