import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register",async(req,res)=>{
  const {name,email,password}=req.body;

  const hash = await bcrypt.hash(password,10);
  const user = await User.create({name,email,password:hash});

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

  res.json({token});
});

// Login
router.post("/login",async(req,res)=>{
  const {email,password}=req.body;

  const user = await User.findOne({email});
  if(!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(400).json("Wrong password");

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
  res.json({token});
});

export default router;
