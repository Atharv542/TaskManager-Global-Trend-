import express from "express";
import Task from "../models/Task.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.use(auth);

// Create
router.post("/", async(req,res)=>{
  const task = await Task.create({...req.body,user:req.userId});
  res.json(task);
});

// Read
router.get("/", async(req,res)=>{
  const tasks = await Task.find({user:req.userId});
  res.json(tasks);
});

//View
router.get("/:id", async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.userId,
  });

  if (!task) return res.status(404).json("Task not found");

  res.json(task);
});

// Update
router.put("/:id", async(req,res)=>{
  const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
  res.json(task);
});

// Delete
router.delete("/:id", async(req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

export default router;
