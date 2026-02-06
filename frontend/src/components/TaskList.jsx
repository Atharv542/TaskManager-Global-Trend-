import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const load = () => {
    axios
      .get("https://taskmanager-global-trend.onrender.com/api/tasks", {
        headers: { authorization: token },
      })
      .then((r) => setTasks(r.data));
  };

  useEffect(load, []);

  const del = async (id) => {
    await axios.delete(
      `https://taskmanager-global-trend.onrender.com/api/tasks/${id}`,
      { headers: { authorization: token } }
    );

    toast.success("Task deleted");
    load();
  };


  const toggleStatus = async (task) => {
    await axios.put(
      `https://taskmanager-global-trend.onrender.com/api/tasks/${task._id}`,
      {
        status: task.status === "Pending" ? "Completed" : "Pending",
      },
      { headers: { authorization: token } }
    );

    toast.success("Status updated");
    load();
  };

  return (
    <>
      <h1 className="text-white text-3xl text-center mt-20">Tasks Created</h1>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center mt-16 gap-4">
          <p className="text-gray-400">No tasks created yet.</p>
          <button
            onClick={() => navigate("/add")}
            className="bg-blue-600 px-6 py-2 rounded"
          >
            Create Task
          </button>
        </div>
      ) : (
        <div className="p-6 grid gap-4 md:grid-cols-4">
          {tasks.map((t) => (
            <div key={t._id} className="card mt-6">
              <h3 className="font-bold">{t.title}</h3>

              
              <span
                className={`text-sm ${
                  t.status === "Completed"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {t.status}
              </span>

              <div className="flex gap-3 mt-3">
                <Link to={`/view/${t._id}`} className="text-blue-400">
                  View
                </Link>

                <Link to={`/edit/${t._id}`} className="text-yellow-400">
                  Edit
                </Link>

                <button onClick={() => del(t._id)} className="text-red-400">
                  Delete
                </button>

                {/* COMPLETE BUTTON */}
                <button
                  onClick={() => toggleStatus(t)}
                  className="text-green-400"
                >
                  {t.status === "Pending" ? "Mark Done" : "Undo"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
