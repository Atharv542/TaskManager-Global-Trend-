import express from "express";
import Task from "../models/Task.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.use(auth);

// Create Task
router.post("/", async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.userId,
    status: "Pending",
  });

  res.json(task);
});

//All Tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(tasks);
});

// Single Tsk
router.get("/:id", async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.userId });
  if (!task) return res.status(404).json("Not found");
  res.json(task);
});

// Update Task
router.put("/:id", async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    req.body,
    { new: true }
  );

  res.json(task);
});

// Dlt
router.delete("/:id", async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
  res.json("Deleted");
});

export default router;
