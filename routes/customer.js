import express from "express";
import customerController from "../controllers/customer.js";
import authenticate from "../middileware/userAuthenticate.js";
import upload from "../middileware/upload.js";


const router = express.Router();

router.use('/user/ApllyJob', upload.fields([{ name: 'resume', maxcount: 1 }]));

router.get('/getjobs', customerController.getjobs);
router.post('/user/register', customerController.register);
router.post('/user/login', customerController.login);
router.post('/user/ApllyJob', authenticate, customerController.ApllyJob);

//get request

router.get('/getjobsbyId/:_id', customerController.getjobsbyId);
router.get('/user/about', authenticate, customerController.about);
//delete


export default router;