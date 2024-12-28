// import express from 'express'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import User from '../models/User.js'
// import dotenv from 'dotenv'
// dotenv.config();

// const router = express.Router();

// //  login Route

// router.post('/login',async(req,res)=>{
//     const {email,password}= req.body;

//     try {
//         //  check user is exists or not 
//         const user =await User.findOne({email});
//         console.log("Email:", email);
//         console.log("Password:", password);
        
//         if(!user){
//             return res.status(404).json({message:"User not found"})
//         }
        
//         //  verify password
//         const isMatch = await bcrypt.compare(password,user.password);

//         if(!isMatch){
//             return res.status(400).json({message:"Invalid password"});
//         }


//         // Generate JWT 
//         const token = jwt.sign(
//             {id:user.id,},
//             process.env.JWT_SECRET,
//             {expiresIn:"7d"}
//         );

//         res.status(200).json({
//             message:"Login successfull",
//             token,

//         })
//     } catch (error) {
//         res.status(500).json({message:"Server error",error:error.message})
//     }
// });

// export default router;

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Received Email:", email);
    console.log("Received Password:", password);

    // Check if user exists (case insensitive)
    const user = await User.findOne({ email});
    console.log("User from DB:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
