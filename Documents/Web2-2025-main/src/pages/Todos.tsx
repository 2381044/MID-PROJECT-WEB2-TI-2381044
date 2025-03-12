import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { motion } from "framer-motion";

interface Todo {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
    image?: string; // Optional image URL
}

interface TodoList {
    todos: Todo[];
}

const fetchTodos = async () => {
    return await axios.get<TodoList>("/todos");
};

const TodoSkeleton = () => {
    const skeletonVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    const skeletonItemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    };

    return (
        <motion.div className="space-y-4" variants={skeletonVariants} initial="hidden" animate="visible">
            {[...Array(3)].map((_, index) => (
                <motion.div
                    key={index}
                    className="flex items-center bg-stone-50 p-4 rounded-xl shadow-md"
                    variants={skeletonItemVariants}
                >
                    <div className="w-4 h-4 rounded-full bg-gray-300 mr-4"></div>
                    <div className="flex-1">
                        <div className="w-full h-4 bg-gray-300 rounded mb-1"></div>
                        <div className="w-2/3 h-3 bg-gray-300 rounded"></div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

const Todos = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["Todos"],
        queryFn: fetchTodos,
        retry: false, // Prevent retries on error if you want to handle them differently
    });
    const navigate = useNavigate();

    const handleTodoClick = (todoId: number) => {
        navigate(`/todos/${todoId}/edit`);
    };

    const todoVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 },
        },
        hover: {
            y: -3,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
            transition: { duration: 0.2 },
        },
        tap: { scale: 0.98 },
    };

    const floatingButtonVariants = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0, opacity: 0 },
        transition: { duration: 0.3, ease: "backInOut" },
        hover: {
            scale: 1.1,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
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
            className="flex flex-col items-center min-h-screen p-6 bg-stone-100" // Off-white background
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h1
                className="text-5xl font-extrabold text-gray-800 mb-10 text-center tracking-wide leading-tight drop-shadow-md"
                style={{ fontFamily: "serif" }} // Use serif font for a handwritten feel
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                My Todo List
            </motion.h1>

            {isLoading ? (
                <div className="w-full max-w-3xl">
                    <TodoSkeleton />
                </div>
            ) : isError ? (
                <motion.div
                    className="text-center text-red-600 text-lg py-5 px-7 rounded-xl bg-red-50 shadow-md"
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <h2 className="text-xl font-bold text-red-600 mb-2">Error fetching todos:</h2>
                    <p>{error instanceof Error ? error.message : "Unknown error"}</p>
                </motion.div>
            ) : (
                <div className="w-full max-w-3xl">
                    <motion.div className="space-y-6" initial="hidden" animate="visible" transition={{ staggerChildren: 0.1 }}>
                        {data?.data.todos.map((todo) => (
                            <motion.div
                                key={todo.id}
                                className={`flex items-start bg-white p-5 rounded-xl shadow-md cursor-pointer hover:bg-stone-50 border border-stone-200 hover:shadow-lg transition-all duration-300 ${todo.completed ? "border-green-300" : "border-yellow-300"
                                    }`}
                                onClick={() => handleTodoClick(todo.id)}
                                variants={todoVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                {todo.image && (
                                    <img
                                        src={todo.image} // Use todo.image here
                                        alt={`Todo ${todo.id}`}
                                        className="w-16 h-16 rounded-xl mr-4 object-cover" // Adjust size and styling as needed
                                    />
                                )}
                                <div
                                    className="w-5 h-5 rounded-full mt-1 mr-4 shadow"
                                    style={{ backgroundColor: todo.completed ? "#a7f3d0" : "#fef08a" }}
                                ></div>
                                <div className="flex-1">
                                    <h2
                                        className={`text-xl font-semibold text-gray-800 line-clamp-1 ${todo.completed ? "line-through text-gray-500" : ""}`}
                                        style={{ fontFamily: "serif" }}
                                    >
                                        {todo.todo}
                                    </h2>
                                    <p className="text-gray-600 text-sm" style={{ fontStyle: "italic" }}>
                                        {todo.completed ? "Completed" : "Pending"}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )}

            <motion.button
                className="fixed bottom-8 right-8 bg-stone-700 text-white py-4 px-7 rounded-full shadow-lg hover:bg-stone-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
                style={{ fontFamily: "serif" }}
                onClick={() => navigate("./add")}
                variants={floatingButtonVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover="hover"
                whileTap="tap"
            >
                Add Todo
            </motion.button>
        </motion.div>
    );
};

export default Todos;