import { useQuery } from "@tanstack/react-query";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";


interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instruction: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  serving: number;
  difficulty: string;
  cuisine: string;
  caloriesPerserving: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface RecipesList {
  recipes: Recipe[];
}

const RecipeCard: React.FC<Recipe> = (recipe: Recipe) => {
  return (
    <>
      <img
        alt={recipe.name}
        src={recipe.image}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
      />

      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 font-bold">
            <a>
              <span aria-hidden="true" className="absolute inset-0" />
              {recipe.name}
            </a>
          </h3>
          <div className="flex items-end gap-2">
            <p className="mt-1 text-sm text-gray-500">{recipe.rating}</p>
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-900">{recipe.difficulty}</p>
      </div>
    </>
  );
}

const fetchRecipesList = async () => {
  return await axios.get<RecipesList>("/recipes");
}

const RecipesSkeleton = () => {
  return (
    <div className="group relative">
      {/* Image Placeholder */}
      <div className="aspect-square w-full rounded-md bg-gray-200 animate-pulse lg:aspect-auto lg:h-80"></div>

      <div className="mt-4 flex justify-between">
        {/* Title Placeholder */}
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          {/* Description Placeholder */}
          <div className="mt-1 h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
        </div>
        {/* Price Placeholder */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
      </div>
    </div>
  );
};

const Recipes = () => {
  const getRecipesList = useQuery({ queryKey: ["recipeList"], queryFn: fetchRecipesList })
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4">
      <button className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10" onClick={() => navigate("./add")}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">List of Recipes</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {getRecipesList.isFetching ? (Array.from({ length: 4 }).map((_, index) => (
              <RecipesSkeleton key={index} />
            ))) : (
              getRecipesList.data?.data.recipes.map((recipe) => (
                <div key={recipe.id} className="group relative" onClick={() => navigate(`/recipes/${recipe.id}`)}>
                  <RecipeCard {...recipe} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Recipes