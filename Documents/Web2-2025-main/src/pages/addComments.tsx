import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";

interface CommentInput {
  body: string;
  postId : number;
  userId: number;
}

const addComment = async (data: CommentInput) => {
  return await axios.post("/comments/add", data);
};

const AddComment = () => {
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(1); // Default user ID (bisa diubah sesuai kebutuhan)
  const [postId, setPostId] = useState(1);
  const navigate = useNavigate();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: addComment,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    mutate({ body: comment, userId, postId });
  };

  if (isSuccess) {
    navigate("/comments", { replace: true });
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Add Comment</h2>

        {/* User ID (Sementara, bisa diganti jadi dropdown user jika ada) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">User ID</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">User ID</label>
          <input
            type="number"
            value={postId}
            onChange={(e) => setPostId(Number(e.target.value))}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Comment Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Your Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
        >
          {isPending ? "Adding..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
};

export default AddComment;