import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/AxiosInstance";

const fetchPostDetail = async (id: string | undefined) => {
  return await axios.get(`/posts/${id}`);
};

const updatePost = async (id: string | undefined, body: any) => {
  return await axios.put(`/post/${id}`, body);
};

const deletePost = async (id: string | undefined) => {
  return await axios.delete(`/post/${id}`);
};

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["postDetail", id],
    queryFn: () => fetchPostDetail(id),
  });

  const post = data?.data;
  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const updateMutation = useMutation({
    mutationFn: () => updatePost(id, { title, body }),
    onSuccess: () => navigate(`/post/${id}`),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => navigate("/posts", { replace: true }),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-xl font-bold text-gray-700">Loading post details...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl text-center">
        <h1 className="text-2xl font-bold text-gray-800">Edit Post</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-3 mt-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => updateMutation.mutate()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            💾 Save
          </button>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this post?")) {
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

export default PostEdit;