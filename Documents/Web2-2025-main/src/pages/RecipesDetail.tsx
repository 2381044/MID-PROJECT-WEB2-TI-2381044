import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";


interface RecipeDetails {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  mealType: string[];
}


interface DeletedRecipe extends RecipeDetails {
  isDeleted: Boolean;
  deletedOn: string;
}

export const fetchRecipeDetail = async (id: string | undefined) => {
  return await axios.get<RecipeDetails>(`/recipes/${id}`);
};

const deleteRecipe = async (id: string | undefined) => {
  return await axios.delete<DeletedRecipe>(`recipes/${id}`);
};



const RecipeDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-7 md:max-w-[900px] md:mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="rounded-2xl my-2 md:w-[48rem] w-[22rem] mx-auto xl:mx-0 animate-pulse h-[26rem] bg-gray-300"></div>
        <div className="flex flex-col gap-5 md:w-xl md:ml-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-end justify-between">
              <div className="w-[380px] rounded-2xl h-7 bg-gray-300 animate-pulse"></div>
              
            </div>
            <div className="flex justify-between text-gray-700">
              <div className="w-[100px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-[150px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
              
            </div>
          </div>
          <div className="flex justify-between text-gray-700 items-center">
            <div className="flex flex-col space-y-2">
              <div className="w-[150px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-[150px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            </div>
            <div className="flex flex-col text-right space-y-1.5">
              <div className="w-[100px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
              <div className="w-[100px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-gray-700">
            <div className="w-[100px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-[180px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
          </div>
          <div className="w-[110px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
        </div>


      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">
        <div className="flex flex-col gap-2">
          <div className="w-[140px] rounded-2xl h-7 bg-gray-300 animate-pulse"></div>
          <div className="flex flex-col text-gray-700 gap-2.5">
            <div className="w-[100px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-[180px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-[100px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
            <div className="w-[180px] rounded-2xl h-6 bg-gray-300 animate-pulse"></div>
          </div>
        </div>
          
        <div className="flex flex-col bg-gray-300 animate-pulse text-white px-4 py-7 rounded-2xl md:w-2xl md:order-first h-[20rem]">
        </div>
      </div>
    </div>
  );
};


const RecipeContent: React.FC<RecipeDetails> = (recipe: RecipeDetails) => {
  return (
    <div className="flex flex-col gap-8 md:max-w-3xl md:mx-auto p-4">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white shadow-lg rounded-2xl p-6">
    <img className="rounded-2xl max-w-sm mx-auto md:mx-0" src={recipe.image} alt={recipe.name} />
    <div className="flex flex-col gap-4 md:w-2/3 md:ml-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="font-bold text-3xl text-gray-800">{recipe.name}</p>
          <div className="flex items-center gap-2 text-yellow-500">
            <p className="text-lg font-semibold">{recipe.rating}</p>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <div className="flex justify-between text-gray-600 text-sm">
          <p className="font-medium">{recipe.cuisine}</p>
          <p className="font-medium">{recipe.mealType.join(", ")}</p>
        </div>
      </div>
      <div className="flex justify-between text-gray-700">
        <p className="text-md font-medium">Difficulty: <span className="font-bold">{recipe.difficulty}</span></p>
        <p className="text-md font-medium">Cook Time: {recipe.cookTimeMinutes} mins</p>
        <p className="text-md font-medium">Prep Time: {recipe.prepTimeMinutes} mins</p>
      </div>
      <div className="text-gray-700 text-sm">
        <p className="font-semibold">Tags: <span className="font-normal">{recipe.tags.join(", ")}</span></p>
      </div>
      <p className="text-gray-700 text-sm">Servings: {recipe.servings} ({recipe.caloriesPerServing * recipe.servings} Cal)</p>
    </div>
  </div>

  <div className="flex flex-col md:flex-row gap-8">
    <div className="flex flex-col bg-gray-100 p-6 rounded-2xl w-full md:w-1/2 shadow">
      <p className="font-bold text-2xl text-gray-800 mb-4">Ingredients</p>
      <ul className="text-gray-700 text-sm list-disc list-inside">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
    <div className="flex flex-col bg-gray-800 text-white p-6 rounded-2xl w-full md:w-1/2 shadow">
      <p className="font-bold text-2xl mb-4">Instructions</p>
      <ol className="text-white text-sm list-decimal list-inside">
        {recipe.instructions.map((step, index) => (
          <li key={index} className="mb-2">{step}</li>
        ))}
      </ol>
    </div>
  </div>
</div>

  );
}



const RecipesDetail = () => {
  const { id } = useParams();
  
  const getRecipeDetails = useQuery({
    queryKey: ["recipeDetail", id],
    queryFn: () => fetchRecipeDetail(id)
  });
  
  const deleteRecipeMutation = useMutation({
    mutationFn: () => deleteRecipe(id)
  });

  const recipe: RecipeDetails | undefined = getRecipeDetails.data?.data;
  
  const navigate = useNavigate();

  useEffect(() => {
    if (deleteRecipeMutation.isSuccess) {
      navigate("/recipes", { replace: true });
    }
  }, [deleteRecipeMutation.isSuccess]);

  return (
    <div className="relative min-h-screen bg-gray-50 p-6">
      {getRecipeDetails.isFetching || recipe === undefined ? (
        <RecipeDetailSkeleton />
      ) : (
        <RecipeContent {...recipe} />
      )}
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative group">
          {/* Main Button */}
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-4 shadow-xl hover:scale-105 transition-transform focus:outline-none focus:ring-4 focus:ring-blue-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg w-36 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200">
            <button
              onClick={() => navigate("edit")}
              className="block w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-blue-100 rounded-t-lg transition"
            >
              ✏️ Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-b-lg transition"
              onClick={() => {
                if (confirm("Are you sure you want to delete this recipe?")) {
                  deleteRecipeMutation.mutate();
                }
              }}
            >
              ❌ Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesDetail