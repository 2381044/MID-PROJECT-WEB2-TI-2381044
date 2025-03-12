import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
  } from "react-router-dom";
  import RootLayout from "./layouts/RootLayout";
  import Comments from "./pages/Comments";
  import Post from "./pages/Post";
  import Product from "./pages/Product";
  import Recipes from "./pages/Recipes";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import ProductDetail from "./pages/ProductDetail";
  import Home from "./pages/Home";
  import AddProduct from "./pages/AddProduct";
  import AddPost from "./pages/addPost";
  import AddRecipes from "./pages/AddRecipes";
  import RecipesDetail from "./pages/RecipesDetail";
  import Todos from "./pages/Todos";
  import AddComments from "./pages/addComments";
  import AddTodos from "./pages/addTodos";	
  import EditRecipes from "./pages/EditRecipes";
  import EditProduct from "./pages/EditProduct";
  import DetailComments from "./pages/DetailComments";
  import DetailPost from "./pages/DetailPost";
  import DetailTodos from "./pages/DetailTodos";
  import EditTodo from "./pages/EditTodos";

  
  const queryClient = new QueryClient();
  
  function App() {
	const router = createBrowserRouter(
	  createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
		  <Route index element={<Home />} />
		  <Route path="/product" element={<Product />} />
		  <Route path="/product/add" element={<AddProduct/>}></Route>
		  <Route path="/product/:id" element={<ProductDetail />} />
		  <Route path="recipes" element={<Recipes />} />
		  <Route path="/posts/add" element={<AddPost/>} />
		  <Route path="posts" element={<Post />} />
		  <Route path="comments" element={<Comments/>} />
		  <Route path="/recipes/add" element={<AddRecipes/>} />
		  <Route path="/recipes/:id" element={<RecipesDetail/>} />
		  <Route path="/todos" element={<Todos/>} />
		  <Route path="/comments/add" element={<AddComments/>} />
		  <Route path="/todos/add" element={<AddTodos/>} />
		  <Route path="/recipes/:id/edit" element={<EditRecipes/>} />
		  <Route path="/product/:id/edit" element={<EditProduct/>} />
		  <Route path="/comments/:id" element={<DetailComments/>} />
		  <Route path="/post/:id" element={<DetailPost/>} />
		  <Route path="/detail/:id" element={<DetailTodos/>} />
		  <Route path="todos/:id/edit" element={<EditTodo/>} />
		</Route>
	  )
	);
	return (
	  <>
		<QueryClientProvider client={queryClient}>
		  <RouterProvider router={router} />
		</QueryClientProvider>
	  </>
	);
  }
  
  export default App;
  