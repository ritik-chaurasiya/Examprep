const Examinee = require('../models/Examinee');
const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendMail');
const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Update profile with file upload
// ✅ Update profile with file upload
router.put("/:id", upload.single("profileImage"), async (req, res) => {
  try {
    const {
      name,
      email,
      number,
      address,
      password,
      college,
      qualification,
      status,
      session,
    } = req.body;

    let updateData = {
      name,
      email,
      number,
      address,
      password,
      college,
      qualification,
      status,
      session,
    };

    if (req.file) {
      updateData.profileImage = req.file.filename;
    }

    const updatedExaminee = await Examinee.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedExaminee) {
      return res.status(404).json({ success: false, message: "Examinee not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedExaminee,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get('/:id',async(req,res)=>{
  const {id} = req.params;
  const examinee = await Examinee.findById(id);
  if(!examinee){
    return res.status(404).json({message:"Examinee not found"});
  }
  // Exclude password from the response
     return res.json({data:examinee});
})


router.get('/',async(req,res)=>{
    const examinee = await Examinee.find();
     return res.json({data:examinee});
})


router.post('/',async(req,res)=>{
  const {email,name}=req.body;
  const existingExaminee=await Examinee.findOne({email:email});
  if(existingExaminee){
    return res.status(400).json({message:"Examinee with this email is already exists"});
  }
    const examinee = await new Examinee(req.body);
    examinee.save()
     res.status(200).json(" Examinee registered successfully");
    const html = `
  <div style="font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #e3f2fd, #ffffff); padding: 40px;">
    <div style="max-width: 650px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden;">
     
      <!-- Header -->
      <div style="background: linear-gradient(90deg, #007bff, #00c6ff); padding: 25px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🎓 Welcome to Softpro!</h1>
      </div>
     
      <!-- Body -->
      <div style="padding: 30px;">
        <p style="font-size: 18px; color: #333;"><strong>Dear ${name},</strong></p>

        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          We're excited to welcome you to the <strong>Softpro Exam Prep</strong>! Your registration was successful, and your account is now active.
        </p>

        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          You can now log in to access your dashboard, take exams, track your progress, and explore learning resources.
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://localhost:5000/login; style="background: #007bff; color: #fff; padding: 12px 24px; font-size: 16px; border-radius: 6px; text-decoration: none; display: inline-block;">
            🔐 Log in to Your Account
          </a>
        </div>

        <p style="font-size: 16px; color: #555;">
          If you have any questions or face issues logging in, feel free to contact our support team.
        </p>

        <p style="margin-top: 30px; font-size: 16px; color: #333;">
          Best regards,<br>
          <strong>Team Softpro</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color: #f1f1f1; text-align: center; padding: 20px; font-size: 12px; color: #777;">
        This is an automated message. Please do not reply to this email.
      </div>
    </div>
  </div>
`;
    setTimeout(async()=>{
        await sendEmail(email,"welcome to the exam portal",html)
    },100)
});
router.delete('/:id',async(req,res)=>{
    const {id}= req.params
    const examinee = await Examinee.findByIdAndDelete(id);
     
    return res.json({message:"Deleted successfully"});
})



router.post('/login', async(req , res)=>{
    const{email , password} =req.body;
    const examinee = await Examinee.findOne({email:email})
    if(!examinee){
        return res.json({message:"Your Email Incorrect"})
    }
    if(examinee.password==password){
        return res.json({message:"Login Successfully",
            user:{
                email:examinee.email,
                role:"user",
                id:examinee._id
            }
        })
    }
})

// change pASSword LOGIC
router.put('/change/:id', async (req, res) => {
    
    const { op, np, cnp } = req.body;
const examinee = await Examinee.find({_id:req.params.id});

        if (!examinee) {
            return res.json({ message: "User not found" });
        }

        if (examinee[0].password !== op) {
            return res.json({ message: "Old password is incorrect" });
        }
       if (np !== cnp) {
            return res.json({ message: "New password and confirm password do not match" });
        }
         try{
          const updateExaminee = await Examinee.findByIdAndUpdate(
            req.params.id,
            {password:np},
            {new:true}
          );
         }catch(error){
          console.error('Error updating password:',error);
          return res.status(500).json({message:"Server error while changing password"})
         }
        
});

module.exports = router;


