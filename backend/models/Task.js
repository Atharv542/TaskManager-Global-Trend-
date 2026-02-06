import mongoose from "mongoose";

export default mongoose.model(
  "Task",
  new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      title: String,
      description: String,
      status: {
        type: String,
        enum: ["Pending", "Completed"],
        default: "Pending",
      },
    },
    { timestamps: true }
  )
);
