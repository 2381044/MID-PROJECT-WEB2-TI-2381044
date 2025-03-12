import { useMutation } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

interface postDat {
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
}


interface Reaction {
  likes: number;
  dislikes: number;
}


const addPost = async (data: postDat) => {
  return await axios.post("/posts/add", data);
};

const AddPost = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: addPost,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/posts", { replace: true });
    }
  }, [isSuccess]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
        {isPending && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="flex items-center bg-white/90 px-6 py-3 rounded-lg shadow-lg">
              <span className="text-2xl mr-4 text-gray-800">Adding...</span>
              <svg
                className="animate-spin h-5 w-5 text-gray-600"
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
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Post</h2>
        <PostForm isEdit={false} mutateFn={mutate} />
      </div>
    </div>
  );
};

export default AddPost;