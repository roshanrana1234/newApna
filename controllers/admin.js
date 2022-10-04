
// import AdminSingup from "../Schema/AdminSingup.js";
import AdminSingup from "../Schema/admin/singup.js";
import initMB from 'messagebird';
const messagebird = initMB('ZUcVDMrE8WjDTdP0h22BQfXdV');
// process.env.SECRET_KEY
import bcrypt from "bcryptjs";
import Postjob from "../Schema/postjob.js";
// import authenticate from "../middleware/authenticate.js";
import jwt from 'jsonwebtoken';
// import  twilio from 'twilio';
// const client = new twilio(process.env.accountSid, process.env.authToken);


class adminController {



  static register = async (req, res) => {

    try {
      const { phonenumber, fullname, email, password } = req.body;

      console.log(req.body);
      const userLogin = await AdminSingup.findOne({ phonenumber: phonenumber });
      console.log(userLogin)
      if (userLogin) {
        if (userLogin.phonenumber == phonenumber) {
          console.log(userLogin)
          res.status(201).send({ message: "number already register", status: "failed" })
        }
      }
      else {
        const lol = { phonenumber, fullname, email, password }
        const register = new AdminSingup(lol)
        await register.save()
        res.status(201).send({ message: "succesfull", status: "succesfull" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }





  // static register = async (req, res) => {

  //   try {
  //     //   const {name,email,password,cpassword,work,mobile,role} = req.body;
  //     const {phonenumber,name,email,role} = req.body;


  //     const register = new AdminSingup(req.body)
  //     await register.save()

  //     res.status(201).send({ message: "succesfull", })
  //   }
  //   catch (error) {
  //     console.log(error)
  //     return res.status(422).json({ error: "not found data" })
  //   }
  // }


  // static Postjob = async (req, res) => {

  //   try {
  //     //   const {name,email,password,cpassword,work,mobile,role} = req.body;
  //     let lol = { ...req.body, createdBy: req.user._id }
  //     console.log(lol)
  //     const register = new Postjob(lol)
  //     await register.save()

  //     res.status(201).send({ message: " job  post succesfull", })
  //   }
  //   catch (error) {
  //     console.log(error)
  //     return res.status(422).json({ error: "not found data" })
  //   }
  // }




  static about = async (req, res) => {
    console.log(`hello about page`);
    // console.log(req.user.role,"529")
    res.send({ "user": req.user })
  }


  static getjobs = async (req, res) => {

    const userLogin = await Postjob.find()
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin)
    }

  }



  static searchjobs = async (req, res) => {

    const { typeOfJob, jobcity } = req.body

    const userLogin = await Postjob.find()
    if (userLogin) {

      res.send(userLogin)
      console.log(userLogin)
    }

  }


  static test = async (req, res) => {
    const { phonenumber } = req.body
    console.log(`hello about page`);
    const userLogin = await AdminSingup.findOne({ phonenumber: phonenumber })
    if (userLogin) {
      console.log(userLogin)
    }

  }

  // console.log(req.user.role,"529")
  //   res.send({"user":req.user}) 


  // $api_url = "http://websms.textidea.com/app/smsapi/index.php?key=4630DB5DA691BB&campaign=8351&routeid=18&type=text&contacts=9302009469,&senderid=TEXTIT&msg=Hello+People%2C+have+a+great+day";

  static addFirstDetails = async (req, res) => {

    try {
      //  const {  name,landmark,adress,pincode,locality,mobile,st,pjl} = req.body;

      // if (!name || !locality || !adress ) {
      //   res.send({ "status": "failed", "message": "All Fields are Required" })

      // }
      const userLogin = await AdminSingup.findOne({ _id: req.user._id })
      if (userLogin) {
        //  console.log(userLogin._id)
        //  console.log(req.user._id)
        //  var objectAdress = { name,landmark,adress,pincode,locality,mobile,st,pjl}       
        await AdminSingup.findByIdAndUpdate(req.user._id, { $push: { firstfrom: req.body } })

        res.send({ "status": "success", "message": "addFirstDetails saved" })
      }
    }
    catch (error) {
      console.log(error)
      return res.status(422).json({ error: "not found data" })
    }
  }




  static login = async (req, res) => {

    try {
      const { phonenumber, password } = req.body
      console.log(req.body)
      if (!phonenumber || !password) {
        return res.status(400).json({ error: "pls filled data" })
      }

      const userLogin = await AdminSingup.findOne({ phonenumber: phonenumber });
      if (userLogin) {

        const isMatch = await bcrypt.compare(password, userLogin.password)

        // const token = await userLogin.generateAuthToken();
        const token = jwt.sign({ userID: userLogin._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        // console.log(token); 
        // res.cookie("jwtoken", token,{
        //     expires:new Date(Date.now() + 2589000000),
        //    httpOnly:true});

        !isMatch ? res.status(400).send({ message: "error" }) : res.send({ "status": "success", "message": "Login Success", "token": token })

      }
      else { res.status(400).send({ message: "filled invalid data" }) }

    } catch (error) {
      console.log(error);
    }
  };



  // static login = async (req, res) => {
  //   const { phonenumber } = req.body
  //   const newPhoneNumber = "+91" + phonenumber
  //   var params = {
  //     template: 'Your Login OTP is %token',
  //     timeout: 3000
  //   };

  //   messagebird.verify.create(newPhoneNumber, params,
  //     (err, response) => {
  //       if (err) {
  //         // Could not send OTP e.g. Phone number Invalid
  //         console.log("OTP Send Error:", err);
  //         res.status(200).send({ "status": "failed", "message": "Unable to Send OTP" })
  //       } else {
  //         // OTP Send Success
  //         console.log("OTP Send Response:", response);

  //         res.status(200).send({ "status": "success", "message": "OTP Send Successfully", "id": response.id })
  //       }
  //     });
  // }

  // static verifyOTP = async (req, res) => {

  //   const { id, otpcode, phonenumber } = req.body
  //   messagebird.verify.verify(id, otpcode,
  //     async (err, response) => {
  //       if (err) {
  //         // Incorrect OTP
  //         console.log("OTP Verification Error:", err)
  //         res.status(200).send({ "status": "failed", "message": "Invalid OTP" })
  //       } else {
  //         // Login Success
  //         console.log("OTP Verification Response:", response)


  //         const userLogin = await AdminSingup.findOne({ phonenumber: phonenumber });
  //         if (userLogin) {

  //           console.log(userLogin)
  //           const token = jwt.sign({ userID: userLogin._id }, process.env.SECRET_KEY, { expiresIn: '1d' })

  //           //   res.send({ "status": "success", "message": "Login Success", "token": token })



  //           res.status(200).send({ "status": "success", "message": "Login Success", "token": token })

  //         }
  //       }
  //     });
  // }


}

export default adminController;