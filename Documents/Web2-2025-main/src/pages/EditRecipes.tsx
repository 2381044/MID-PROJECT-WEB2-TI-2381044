import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import RecipeForm, { Recipe } from "../components/RecipeForm";
import { fetchRecipeDetail } from "./RecipesDetail";

const editRecipe = async (data: Recipe, id: string | undefined) => {
  return await axios.put(`/recipes/${id}`, data);
};

const EditRecipes = () => {
  const { id } = useParams();

  const editRecipeMutation = useMutation({
    mutationFn: (data: Recipe) => editRecipe(data, id),
  });

  const getRecipeDetail = useQuery({
    queryKey: ["recipeDetail", id],
    queryFn: () => fetchRecipeDetail(id),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (editRecipeMutation.isSuccess) {
      navigate("/recipes", { replace: true });
    }
  }, [editRecipeMutation.isSuccess]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-100 to-green-300">
      {(editRecipeMutation.isPending || getRecipeDetail.isFetching) && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center">
          <div className="flex items-center bg-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
            <span className="text-xl font-semibold text-gray-800">Loading...</span>
            <svg
              className="animate-spin h-6 w-6 text-green-600 ml-3"
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

      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-xl">
       
        <RecipeForm
          isEdit={true}
          mutateFn={editRecipeMutation.mutate}
          defaultInputData={getRecipeDetail.data?.data}
        />
      </div>
    </div>
  );
};

export default EditRecipes;
