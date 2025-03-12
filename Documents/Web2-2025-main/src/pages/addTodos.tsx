import { useMutation } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodosForm, { TodoData } from "../components/TodosForm";

// Function to send todo to backend
const addTodo = async (data: TodoData) => {
  return await axios.post("/todos/add", data);
};

const AddTodos = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: addTodo,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/todos", { replace: true });
    }
  }, [isSuccess]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300">
      {isPending && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center">
          <div className="flex items-center bg-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
            <span className="text-xl font-semibold text-gray-800">Adding...</span>
            <svg
              className="animate-spin h-6 w-6 text-indigo-600 ml-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-700">Add Todo</h2>
        <TodosForm isEdit={false} mutateFn={mutate} />
      </div>
    </div>
  );
};

export default AddTodos;