import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/AxiosInstance";

const fetchTodoDetail = async (id: string | undefined) => {
  const response = await axios.get(`/todos/${id}`);
  return response.data;
};

const updateTodo = async (id: string | undefined, updatedTodo: { todo: string; completed: boolean }) => {
  return await axios.put(`/todos/${id}`, updatedTodo);
};

const deleteTodo = async (id: string | undefined) => {
  return await axios.delete(`/todos/${id}`);
};

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: todo, isLoading, isError } = useQuery({
    queryKey: ["todoDetail", id],
    queryFn: () => fetchTodoDetail(id),
    enabled: !!id, // Prevents fetching if id is undefined
  });

  const [todoText, setTodoText] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (todo) {
      setTodoText(todo.todo);
      setCompleted(todo.completed);
    }
  }, [todo]);

  const updateMutation = useMutation({
    mutationFn: (updatedTodo: { todo: string; completed: boolean }) => updateTodo(id, updatedTodo),
    onSuccess: () => navigate(`/todos/${id}`),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(id),
    onSuccess: () => navigate("/todos", { replace: true }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-700 text-xl">Loading todo details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-xl">Error fetching todo details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl text-center">
        <h1 className="text-2xl font-bold text-gray-800">Edit Todo</h1>
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="w-full p-3 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded"
            />
            <span className="text-gray-800">Completed</span>
          </label>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => updateMutation.mutate({ todo: todoText, completed })}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            💾 Save
          </button>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this todo?")) {
                deleteMutation.mutate();
              }
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            ❌ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
