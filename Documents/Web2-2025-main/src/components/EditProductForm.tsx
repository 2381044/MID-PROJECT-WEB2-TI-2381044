import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UseMutateFunction } from "@tanstack/react-query";

interface EditProductFormProps {
  mutateFn: UseMutateFunction<any, Error, ProductFormInput, unknown>;
  defaultInputData: ProductFormInput;
}

export type ProductFormInput = {
  name: string;
  price: number;
  description: string;
  stock: number;
};

const EditProductForm: React.FC<EditProductFormProps> = ({ mutateFn, defaultInputData }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormInput>();

  useEffect(() => {
    if (defaultInputData) {
      setValue("name", defaultInputData.name);
      setValue("price", defaultInputData.price);
      setValue("stock", defaultInputData.stock);
      setValue("description", defaultInputData.description);
    }
  }, [defaultInputData, setValue]);

  const onSubmit: SubmitHandler<ProductFormInput> = (data) => {
    if (!confirm("Are you sure you want to update this product?")) return;
    mutateFn(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Product</h2>

      {/* Product Name */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold" htmlFor="name">Product Name</label>
        <input
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400"
          type="text"
          id="name"
          {...register("name", { required: "Product name is required." })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold" htmlFor="price">Price</label>
        <input
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400"
          type="number"
          id="price"
          {...register("price", { required: "Price is required.", min: { value: 1, message: "Price must be greater than zero." } })}
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      {/* Stock */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold" htmlFor="stock">Stock</label>
        <input
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400"
          type="number"
          id="stock"
          {...register("stock", { required: "Stock is required.", min: { value: 0, message: "Stock cannot be negative." } })}
        />
        {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold" htmlFor="description">Description</label>
        <textarea
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400"
          id="description"
          rows={4}
          {...register("description", { required: "Description is required." })}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-4 bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all"
      >
        Update Product
      </button>
    </form>
  );
};

export default EditProductForm;
