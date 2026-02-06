import axios from "axios";
import {useState} from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  const submit=async e=>{
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/auth/login",{email,password});
    localStorage.setItem("token",res.data.token);
    nav("/tasks");
    toast.success("Logged in Successfully")
  }

  return(
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
      <form onSubmit={submit} className="bg-slate-900 p-6 rounded w-full max-w-sm">
        <h2 className="text-xl mb-4">Login</h2>
        <input className="w-full p-2 mb-3 bg-slate-800" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <input type="password" className="w-full p-2 mb-3 bg-slate-800" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <button className="bg-blue-600 w-full p-2 rounded">Login</button>
      </form>
    </div>
  )
}
