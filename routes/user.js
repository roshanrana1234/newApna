import express from "express";
import userController from "../controllers/user.js";
import authenticate from "../middileware/authenticate.js";



const router = express.Router();


//post request
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/Postjob', authenticate, userController.Postjob);

// router.post('/login', UserController.userLogin)
router.post('/verify', userController.verifyOTP)
router.get('/about', authenticate, userController.about);
router.post('/addFirstDetails', authenticate, userController.addFirstDetails);

router.get('/test', userController.test);
router.get('/getpostjobs', authenticate, userController.getpostjobs);

//delete
router.delete('/deletejobbyid/:_id', userController.deletejobbyid);

export default router