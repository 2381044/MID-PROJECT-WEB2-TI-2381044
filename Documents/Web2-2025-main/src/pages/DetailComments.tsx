import { useMutation, useQuery } from "@tanstack/react-query";
import { replace, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/AxiosInstance";

const fetchCommentDetail = async (id : string | undefined) => {
  return await axios.get(`/comments/${id}`);
};

const updateComment = async (id :string | undefined , body : any) => {
  return await axios.put(`/comments/${id}`, { body });
};

const deleteComment = async (id : string | undefined) => {
  return await axios.delete(`/comments/${id}`);
};

const CommentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["commentDetail", id],
    queryFn: () => fetchCommentDetail(id),
  });
  
  const comment = data?.data;
  const [body, setBody] = useState(comment?.body || "");

  const updateMutation = useMutation({
    mutationFn: (data : string) => updateComment(id, data),
    onSuccess: () => navigate(`/comments/${id}`),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteComment(id),
    onSuccess: () => navigate("/comments", { replace: true }),
  });

  useEffect(() =>{
    if(updateMutation.isSuccess){
      navigate("/comments", {replace : true})
    }
  },[updateMutation.isSuccess])

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl text-center">
        <h1 className="text-2xl font-bold text-gray-800">Edit Comment</h1>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-3 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => updateMutation.mutate(body)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            💾 Save
          </button>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this comment?")) {
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

export default CommentEdit;
