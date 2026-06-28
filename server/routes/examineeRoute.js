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
   <div style="font-family:Arial,sans-serif;background:#f5f7fb;padding:40px 20px;">
   
     <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:15px;overflow:hidden;box-shadow:0 8px 25px rgba(0,0,0,.1);">
   
       <!-- Header -->
       <div style="background:linear-gradient(90deg,#4F46E5,#7C3AED);padding:35px;text-align:center;">
   
         <h1 style="margin:0;color:#fff;font-size:30px;">
           🎓 ExamPrep AI
         </h1>
   
         <p style="margin-top:10px;color:#e8e8ff;font-size:16px;">
           Online Examination Management System
         </p>
   
       </div>
   
       <!-- Body -->
   
       <div style="padding:35px;">
   
         <h2 style="color:#333;">
           Hello ${name},
         </h2>
   
         <p style="font-size:16px;color:#555;line-height:1.8;">
           Congratulations! 🎉
         </p>
   
         <p style="font-size:16px;color:#555;line-height:1.8;">
           Your registration has been completed successfully.
           Your account is now active and you can access your dashboard,
           attend examinations, view results and monitor your progress.
         </p>
   
         <table
           width="100%"
           cellpadding="12"
           style="margin:30px 0;background:#F4F3FF;border-radius:10px;"
         >
   
           <tr>
   
             <td>
   
               <strong>Name :</strong> ${name}
   
             </td>
   
           </tr>
   
           <tr>
   
             <td>
   
               <strong>Email :</strong> ${email}
   
             </td>
   
           </tr>
   
         </table>
   
         <!-- Button -->
   
         <div style="text-align:center;margin:35px 0;">
   
           <a
             href="https://your-frontend-url.com/login"
             style="
               background:linear-gradient(90deg,#4F46E5,#7C3AED);
               color:#fff;
               text-decoration:none;
               padding:15px 35px;
               border-radius:30px;
               display:inline-block;
               font-size:17px;
               font-weight:bold;
             "
           >
             🔐 Login to Your Account
           </a>
   
         </div>
   
         <h3 style="color:#4F46E5;">
           What you can do now?
         </h3>
   
         <ul style="color:#555;font-size:15px;line-height:2;">
   
           <li>✅ Login to your dashboard</li>
   
           <li>📝 Attend online exams</li>
   
           <li>📊 View exam results instantly</li>
   
           <li>👤 Update your profile</li>
   
           <li>💬 Contact the administrator anytime</li>
   
         </ul>
   
         <hr style="margin:35px 0;border:none;border-top:1px solid #ddd;">
   
         <p style="font-size:15px;color:#666;">
   
           If you didn't create this account, please ignore this email.
   
         </p>
   
         <p style="margin-top:25px;color:#333;">
   
           Regards,<br>
   
           <strong>ExamPrep AI Team</strong>
   
         </p>
   
       </div>
   
       <!-- Footer -->
   
       <div
         style="
           background:#F4F3FF;
           text-align:center;
           padding:20px;
           font-size:13px;
           color:#666;
         "
       >
   
         © ${new Date().getFullYear()} ExamPrep AI
   
         <br>
   
         This is an automated email. Please do not reply.
   
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


