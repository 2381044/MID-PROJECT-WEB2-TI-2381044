import { UseMutateFunction } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ProductFormProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, ProductFormInput, unknown>;
  defaultInputData?: ProductFormInput;
}

export type ProductFormInput = {
  title: string;
  description: string;
  price: number;
  category: string;
  discountPercentage: number;
};

const ProductForm: React.FC<ProductFormProps> = ({ isEdit, mutateFn, defaultInputData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormInput>();

  useEffect(() => {
    if (defaultInputData) {
      setValue("title", defaultInputData.title);
      setValue("description", defaultInputData.description);
      setValue("discountPercentage", defaultInputData.discountPercentage);
      setValue("category", defaultInputData.category);
      setValue("price", defaultInputData.price);
    }
  }, [defaultInputData, setValue]);

  const onSubmit: SubmitHandler<ProductFormInput> = (data) => {
    if (isEdit && !confirm("Are you sure you want to update the product data?")) {
      return;
    }
    mutateFn(data);
  };

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        {isEdit ? "Update Product" : "Create a New Product"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter product title"
            {...register("title", { required: "Title is required." })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            rows={4}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter product description"
            {...register("description", { required: "Description is required." })}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium">Price ($)</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter price"
            {...register("price", { required: "Price is required." })}
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <select
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            {...register("category", { required: "Category is required." })}
          >
            <option value="beauty">Beauty</option>
            <option value="fragrance">Fragrance</option>
            <option value="furniture">Furniture</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Discount Percentage */}
        <div>
          <label className="block text-gray-700 font-medium">Discount (%)</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter discount percentage"
            {...register("discountPercentage", { required: "Discount is required." })}
          />
          {errors.discountPercentage && <p className="text-red-500 text-sm">{errors.discountPercentage.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-semibold text-white transition transform hover:scale-105 ${
              isEdit ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isEdit ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;