import {Link,useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function Navbar(){
  const nav=useNavigate();
  const token=localStorage.getItem("token");
  let name=null;

  if(token) name=jwtDecode(token).name;

  const logout=()=>{
    localStorage.clear();
    nav("/");
  };

  return(
    <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
      <span className="font-bold">TaskFlow</span>

      <div className="space-x-4">
        {token && <>
          <Link to="/add">Task Form</Link>
          <Link to="/tasks">View Tasks</Link>
        </>}
      </div>

      <div>
        {token?
          <div className="flex gap-3 items-center">
            <span>{name}</span>
            <button onClick={logout} className="text-red-400">Logout</button>
          </div>
          :
          <Link to="/">Login</Link>
        }
      </div>
    </div>
  );
}
