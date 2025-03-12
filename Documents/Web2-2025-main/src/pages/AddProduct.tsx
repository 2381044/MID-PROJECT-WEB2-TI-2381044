import { useMutation } from "@tanstack/react-query";
import ProductForm, { ProductFormInput } from "../components/ProductForm";
import axios from "../utils/AxiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const addProduct = async (data: ProductFormInput) => {
  return await axios.post("/products/add", data);
};

const AddProduct = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: addProduct
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isSuccess) {
      navigate("/product", { replace: true });
    }
  }, [isSuccess]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        {isPending && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="flex items-center bg-white/90 px-6 py-3 rounded-lg shadow-lg">
              <span className="text-2xl mr-4 text-gray-800">Adding...</span>
              <svg
                className="animate-spin h-5 w-5 text-gray-600"
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
        
        <ProductForm isEdit={false} mutateFn={mutate} />
      </div>
    </div>
  );
};

export default AddProduct;
