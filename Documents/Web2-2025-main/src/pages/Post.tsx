import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { motion } from "framer-motion";

// Interface untuk Post, Reaction, dan PostList
interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  thumbnail: string;
  reactions: Reaction;
  views: number;
  userId: number;
}

interface Reaction {
  likes: number;
  dislikes: number;
}

interface PostList {
  posts: Post[];
}

// Fungsi untuk mengambil data pos dari API
const fetchPostList = async () => {
  return await axios.get<PostList>("/post");
};

// Komponen Skeleton Loader (Menampilkan loading state)
const PostSkeleton = () => {
  const skeletonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div className="space-y-4" variants={skeletonVariants} initial="hidden" animate="visible">
      {[...Array(3)].map((_, index) => (
        <motion.div key={index} className="flex space-x-4 p-4 bg-gray-100 rounded-lg shadow-md animate-pulse">
          <div className="w-12 h-12 rounded-full bg-gray-300"></div>
          <div className="flex-1">
            <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
            <div className="w-3/4 h-3 bg-gray-300 rounded mb-1"></div>
            <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Komponen utama Post
const Post = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Post"],
    queryFn: fetchPostList,
  });
  const navigate = useNavigate();

  // Fungsi untuk menangani klik pos dan mengarahkan ke halaman detail
  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const postVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
  };

  const floatingButtonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { duration: 0.3, ease: "backInOut" },
    hover: { scale: 1.1, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", transition: { duration: 0.2 } },
    tap: { scale: 0.9 },
  };

  const errorVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2,
            },
        },
    };


  return (
    <motion.div
      className="flex items-center justify-center min-h-screen p-4 bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-4xl">
        <motion.h1
          className="text-3xl font-semibold text-gray-800 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Post List
        </motion.h1>
        {isLoading ? (
          <PostSkeleton />
        ) : isError ? (
          <motion.div
            className="text-center text-red-600 text-lg py-4 px-6 rounded-md bg-red-100 shadow-md"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl font-bold text-red-600 mb-2">Error fetching posts:</h2>
            <p>{error instanceof Error ? error.message : "Unknown error"}</p>
          </motion.div>
        ) : (
            <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
            {data?.data.posts.map((post) => (
              <motion.div
                key={post.id}
                className="bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-50 p-4"
                onClick={() => handlePostClick(post.id)}
                variants={postVariants}
                whileHover="hover"
              >
                <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                <p className="text-gray-600 mt-2">{post.body.slice(0, 100)}...</p>
                <div className="flex flex-wrap mt-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 text-gray-600">
                  <div className="flex space-x-3">
                    <span>Likes: {post.reactions.likes}</span>
                    <span>Dislikes: {post.reactions.dislikes}</span>
                  </div>
                  <div>Views: {post.views}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Tombol tambah post */}
      <motion.button
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => navigate("./add")}
        variants={floatingButtonVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover="hover"
        whileTap="tap"
      >
        Add Post
      </motion.button>
    </motion.div>
  );
};

export default Post;