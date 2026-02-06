import axios from "axios";
import {useState} from "react";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";

export default function Register(){
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav=useNavigate();

 const submit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://taskmanager-global-trend.onrender.com/api/auth/register",
      { name, email, password }
    );

    localStorage.setItem("token", res.data.token);
    toast.success("Registered successfully");
    nav("/tasks");

  } catch (err) {
    if (err.response?.status === 409) {
      toast.error("User already exists. Please login.");
    } else {
      toast.error("Registration failed");
    }
  }
};


  return(
    <div className="min-h-screen flex justify-center items-center bg-slate-950 p-4">
      <form onSubmit={submit} className="bg-slate-900 p-6 rounded w-full max-w-sm text-white">
        <h2 className="text-xl mb-4">Register</h2>
        <input className="w-full p-2 mb-3 bg-slate-800" placeholder="Name" onChange={e=>setName(e.target.value)}/>
        <input className="w-full p-2 mb-3 bg-slate-800" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <input type="password" className="w-full p-2 mb-3 bg-slate-800" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <button className="bg-green-600 w-full p-2 rounded">Register</button>
          <p className="text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
