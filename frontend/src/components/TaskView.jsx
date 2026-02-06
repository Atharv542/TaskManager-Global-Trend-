import axios from "axios";
import {useParams} from "react-router-dom";
import {useEffect,useState} from "react";

export default function TaskView(){
  const {id}=useParams();
  const [task,setTask]=useState({});

  useEffect(()=>{
    axios.get(`https://taskmanager-global-trend.onrender.com/api/tasks/${id}`,{headers:{authorization:localStorage.getItem("token")}})
    .then(r=>setTask(r.data));
  },[]);

  return(
    <div className="p-6 text-white">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  );
}
