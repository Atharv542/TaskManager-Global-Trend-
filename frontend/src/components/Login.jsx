import axios from "axios";
import {useState} from "react";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

const submit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "https://taskmanager-global-trend.onrender.com/api/auth/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    toast.success("Logged in Successfully");
    nav("/tasks");

  } catch (err) {
    if (err.response?.status === 404) {
      toast.error("User does not exist");
    } else if (err.response?.status === 401) {
      toast.error("Wrong password");
    } else {
      toast.error("Login failed");
    }
  }
};


  return(
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
      <form onSubmit={submit} className="bg-slate-900 p-6 rounded w-full max-w-sm">
        <h2 className="text-xl mb-4">Login</h2>
        <input className="w-full p-2 mb-3 bg-slate-800" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
        <input type="password" className="w-full p-2 mb-3 bg-slate-800" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
        <button className="bg-blue-600 w-full p-2 rounded">Login</button>
        <p className="text-sm text-gray-400 text-center">
          New user?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </div>
  )
}
