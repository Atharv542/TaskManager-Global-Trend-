import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";
import {useState,useEffect} from "react";
import toast from "react-hot-toast";

export default function TaskEdit(){
  const {id}=useParams();
  const nav=useNavigate();
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");

  useEffect(()=>{
    axios.get(`https://taskmanager-global-trend.onrender.com/api/tasks/${id}`,{headers:{authorization:localStorage.getItem("token")}})
    .then(r=>{
      setTitle(r.data.title);
      setDescription(r.data.description);
    });
  },[]);

  const save=async()=>{
    await axios.put(`https://taskmanager-global-trend.onrender.com/api/tasks/${id}`,{title,description},{
      headers:{authorization:localStorage.getItem("token")}
    });
    nav("/tasks");
    toast.success("Edited successfully")
  };

  return(
    <div className="p-6">
      <input className="input" value={title} onChange={e=>setTitle(e.target.value)}/>
      <textarea className="input" value={description} onChange={e=>setDescription(e.target.value)}/>
      <button onClick={save} className="btn">Update</button>
    </div>
  );
}
