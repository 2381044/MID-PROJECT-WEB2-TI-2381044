import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UseMutateFunction } from "@tanstack/react-query";

interface CommentFormProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, CommentInput, unknown>;
  defaultInputData?: CommentInput;
}

export type CommentInput = {
  body: string;
  userId: number;
};

const CommentForm: React.FC<CommentFormProps> = ({ isEdit, mutateFn, defaultInputData }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CommentInput>();

  useEffect(() => {
    if (defaultInputData) {
      setValue("body", defaultInputData.body);
      setValue("userId", defaultInputData.userId);
    }
  }, [defaultInputData, setValue]);

  const onSubmit: SubmitHandler<CommentInput> = (data) => {
    if (isEdit && !confirm("Are you sure you want to update the comment?")) {
      return;
    }
    mutateFn(data);
  };

  return (
    <form className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-300" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{isEdit ? "Edit Comment" : "Add New Comment"}</h2>

      <div className="space-y-4">
        {/* User ID Input */}
        <div>
          <label className="block text-gray-700 font-semibold" htmlFor="userId">User ID</label>
          <input
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400"
            type="number"
            id="userId"
            {...register("userId", { required: "User ID is required." })}
          />
          {errors.userId && <p className="text-red-500 text-sm">{errors.userId.message}</p>}
        </div>

        {/* Comment Body Input */}
        <div>
          <label className="block text-gray-700 font-semibold" htmlFor="body">Comment</label>
          <textarea
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-400"
            id="body"
            rows={4}
            {...register("body", { required: "Comment cannot be empty." })}
          />
          {errors.body && <p className="text-red-500 text-sm">{errors.body.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all"
        >
          {isEdit ? "Save Changes" : "Add Comment"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
