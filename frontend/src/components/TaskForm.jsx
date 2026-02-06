import axios from "axios";
import {useState} from "react";
import toast from "react-hot-toast";

export default function TaskForm(){
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");

  const submit=async e=>{
    e.preventDefault();
    await axios.post("https://taskmanager-global-trend.onrender.com/api/tasks",
      {title,description},
      {headers:{authorization:localStorage.getItem("token")}}
    );
    toast.success("Task Added");
    setTitle("")
    setDescription("")
  };

  return(
    <div className="p-6 flex justify-center py-50 ">
      <form onSubmit={submit} className="bg-slate-900 p-6 rounded w-full max-w-md py-10">
        <h1 className="text-white mb-4 text-3xl bold text-center ">Create Task</h1>
        <input className="input border-2 border-white rounded-md mt-5" placeholder="Enter title" onChange={e=>setTitle(e.target.value)} value={title}/>
        <textarea className="input resize-none border-2 rounded-md mt-3 border-white" placeholder="Enter description" onChange={e=>setDescription(e.target.value)} value={description}/>
        <button className="btn mt-3 cursor-pointer">Save</button>
      </form>
    </div>
  );
}
