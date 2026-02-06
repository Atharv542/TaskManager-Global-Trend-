import {BrowserRouter,Routes,Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskView from "./components/TaskView";
import TaskEdit from "./components/TaskEdit";

export default function App(){
  return(
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/add" element={<TaskForm/>}/>
        <Route path="/tasks" element={<TaskList/>}/>
        <Route path="/view/:id" element={<TaskView/>}/>
        <Route path="/edit/:id" element={<TaskEdit/>}/>
      </Routes>
    </BrowserRouter>
  );
}
