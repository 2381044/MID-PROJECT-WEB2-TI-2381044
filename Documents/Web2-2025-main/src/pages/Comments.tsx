import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { motion } from "framer-motion";

interface Comment {
    id: number;
    body: string;
    likes: number;
    user: {
        id: number;
        username: string;
        fullName: string;
    };
}

interface CommentList {
    comments: Comment[];
}

const fetchComments = async () => {
    return await axios.get<CommentList>("/comments");
};

const CommentSkeleton = () => {
    const skeletonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, staggerChildren: 0.1 },
        },
    };

    const skeletonItemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    };

    return (
        <motion.div className="space-y-4" variants={skeletonVariants} initial="hidden" animate="visible">
            {[...Array(3)].map((_, index) => (
                <motion.div
                    key={index}
                    className="flex space-x-4 p-4 bg-white rounded-2xl shadow-md"
                    variants={skeletonItemVariants}
                >
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

const Comments = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["Comments"],
        queryFn: fetchComments,
    });
    const navigate = useNavigate();

    const handleCommentClick = (commentId: number) => {
        navigate(`/comments/${commentId}`);
    };

    const commentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
        hover: {
            y: -5,
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
            transition: { duration: 0.2 },
        },
    };

    const floatingButtonVariants = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0, opacity: 0 },
        transition: { duration: 0.3, ease: "backInOut" },
        hover: {
            scale: 1.1,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.2 },
        },
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

    return (
        <motion.div
            className="flex flex-col items-center min-h-screen p-6 bg-gradient-to-br from-teal-50 via-cyan-100 to-lime-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1
                className="text-5xl font-extrabold text-gray-900 text-center mb-10 drop-shadow-md text-gradient bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-green-600"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                Community Comments
            </motion.h1>

            {isLoading ? (
                <div className="w-full max-w-3xl">
                    <CommentSkeleton />
                </div>
            ) : isError ? (
                <motion.div
                    className="text-center text-red-600 text-lg py-5 px-7 rounded-xl bg-red-50 shadow-md border border-red-200"
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <p className="font-semibold">Error fetching comments:</p>
                    <p>{error instanceof Error ? error.message : "Unknown error"}</p>
                </motion.div>
            ) : (
                <motion.div
                    className="space-y-7 w-full max-w-3xl"
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.1 }}
                >
                    {data?.data.comments.map((comment, index) => (
                        <motion.div
                            key={comment.id}
                            className="bg-white rounded-3xl shadow-md transition-transform cursor-pointer border border-gray-100 hover:border-gray-300"
                            onClick={() => handleCommentClick(comment.id)}
                            variants={commentVariants}
                            whileHover="hover"
                            style={{ transitionDelay: `${index * 0.05}s` }}
                        >
                            <div className="p-5 flex space-x-5">
                                <div className="w-14 h-14 rounded-full bg-green-100 text-green-800 flex items-center justify-center">
                                    {comment.user.fullName ? (
                                        <span className="text-3xl font-semibold">{comment.user.fullName[0].toUpperCase()}</span>
                                    ) : (
                                        <span>User</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-800">{comment.user.fullName}</h3>
                                    <p className="text-gray-600 mt-2 line-clamp-2">{comment.body}</p>
                                    <div className="mt-4 flex justify-between items-center text-gray-500">
                                        <span>{comment.likes} Likes</span>
                                        <span>Comments</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            <motion.button
                className="fixed bottom-8 right-8 bg-gradient-to-r from-green-600 to-teal-600 text-white p-5 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                onClick={() => navigate("./add")}
                variants={floatingButtonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
                whileTap="tap"
            >
                <svg
                    className="w-7 h-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
            </motion.button>
        </motion.div>
    );
};

export default Comments;