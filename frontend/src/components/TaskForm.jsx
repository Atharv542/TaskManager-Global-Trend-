import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await axios.post(
      "https://taskmanager-global-trend.onrender.com/api/tasks",
      { title, description, status: "Pending" },
      { headers: { authorization: localStorage.getItem("token") } }
    );

    toast.success("Task created");

    setTitle("");
    setDescription("");
  };

  return (
    <div className="p-6 flex justify-center mt-40">
      <form className="bg-slate-900 p-6 rounded w-full max-w-md" onSubmit={submit}>
        <h2 className="text-white mb-4 text-center">Create Task</h2>

        <input
          className="input border-2 border-white mt-5"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="input border-2 boder-white mt-3 resize-none"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button className="btn mt-3">Save</button>
      </form>
    </div>
  );
}
