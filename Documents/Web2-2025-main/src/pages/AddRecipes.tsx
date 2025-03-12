import { useMutation } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface RecipeData {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string;
}

const addRecipe = async (data: RecipeData) => {
  return await axios.post("/recipes/add", data);
};

const AddRecipes = () => {
  const [formData, setFormData] = useState<RecipeData>({
    title: "",
    description: "",
    ingredients: [],
    instructions: "",
  });

  const [ingredientsText, setIngredientsText] = useState("");

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: addRecipe,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/recipes", { replace: true });
    }
  }, [isSuccess, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ingredientsArray = ingredientsText
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    mutate({
      ...formData,
      ingredients: ingredientsArray
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeInOut", staggerChildren: 0.1 },
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-rose-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.form 
        onSubmit={handleSubmit}
        className="relative bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl border border-gray-100"
      >
        {isPending && (
          <motion.div className="absolute inset-0 bg-white/70 backdrop-blur-md z-10 flex items-center justify-center rounded-3xl">
            <div className="flex items-center bg-white/95 px-6 py-3 rounded-full shadow-lg border border-gray-200">
              <span className="text-lg mr-4 text-gray-800 font-semibold">Adding...</span>
              <motion.div
                className="h-6 w-6 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"
              />
            </div>
          </motion.div>
        )}

        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 bg-clip-text text-trans parent bg-gradient-to-r from-pink-600 to-rose-600">
          Add Recipe
        </h2>
        
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="ingredients">Ingredients (one per line)</label>
          <textarea
            id="ingredients"
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            rows={5}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
        >
          Submit Recipe
        </button>
      </motion.form>
    </motion.div>
  );
};

export default AddRecipes;