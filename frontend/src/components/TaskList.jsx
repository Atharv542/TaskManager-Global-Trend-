import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://taskmanager-global-trend.onrender.com/api/tasks", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((r) => setTasks(r.data));
  }, []);

  const del = (id) => {
    axios
      .delete(`https://taskmanager-global-trend.onrender.com/api/tasks/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then(() => setTasks(tasks.filter((t) => t._id !== id)));
      toast.success("Task Deleted")
  };

  return (
    <>
      <h1 className="text-white text-3xl text-center mt-20">
        Tasks Created
      </h1>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center mt-16 gap-4">
          <p className="text-gray-400 text-lg">
            No tasks created yet.
          </p>

          <button
            onClick={() => navigate("/add")}
            className="bg-blue-600 cursor-pointer px-6 py-2 rounded text-white hover:bg-blue-700 transition"
          >
            Create Task
          </button>
        </div>
      ) : (
        <div className="p-6 grid gap-4 md:grid-cols-4">
          {tasks.map((t) => (
            <div key={t._id} className="card mt-10">
              <h3>Title: {t.title}</h3>

              <div className="flex gap-3 mt-2">
                <Link to={`/view/${t._id}`} className="text-blue-400">
                  View
                </Link>

                <Link to={`/edit/${t._id}`} className="text-yellow-400">
                  Edit
                </Link>

                <button
                  onClick={() => del(t._id)}
                  className="text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
