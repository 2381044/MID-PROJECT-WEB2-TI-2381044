import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { UseMutateFunction } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Textarea } from '@headlessui/react';

interface PostFormFields {
    title: string;
    body: string;
    tags: string;
    reactions: ReactionType;
    views: number;
    userId: number;
}

interface PostDat {
    title: string;
    body: string;
    tags: string[];
    reactions: ReactionType;
    views: number;
    userId: number;
}

interface ReactionType {
    likes: number;
    dislikes: number;
}

interface PostFormElementProps {
    isEdit: boolean;
    mutateFn: UseMutateFunction<any, Error, PostDat, unknown>;
    defaultInputData?: PostDat;
}

const PostForm: React.FC<PostFormElementProps> = ({ isEdit, mutateFn, defaultInputData }) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<PostFormFields>();

    useEffect(() => {
        if (defaultInputData) {
            setValue("title", defaultInputData.title);
            setValue("body", defaultInputData.body);
            setValue("tags", defaultInputData.tags.join(", "));
            setValue("userId", defaultInputData.userId);
        }
    }, [defaultInputData, setValue]);

    const submitHandler: SubmitHandler<PostFormFields> = (data) => {
        const formattedData: PostDat = {
            ...data,
            tags: data.tags.split(',').map(tag => tag.trim()),
            reactions: isEdit ? defaultInputData?.reactions || { likes: 0, dislikes: 0 } : { likes: 0, dislikes: 0 },
            views: isEdit ? defaultInputData?.views || 1 : 1,
        };
        mutateFn(formattedData);
    };

    const formVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeInOut" },
        },
    };

    const inputVariants = {
        focus: {
            boxShadow: "0 0 0 2px rgba(107, 114, 128, 0.3)",
            transition: { duration: 0.2 },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            backgroundColor: isEdit ? "rgb(59 130 246)" : "rgb(74 222 128)",
            transition: { duration: 0.3 },
        },
        tap: { scale: 0.95 },
    };

    return (
        <motion.form
            className="mx-auto max-w-lg space-y-6 rounded-2xl bg-white p-8 shadow-xl border border-gray-100"
            onSubmit={handleSubmit(submitHandler)}
            variants={formVariants}
            initial="hidden"
            animate="visible"
        >
            <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
                {isEdit ? "Edit Post" : "Create a New Post"}
            </h2>

            {/* User ID Field */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="userId">
                    User ID
                </label>
                <motion.input
                    type="number"
                    id="userId"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    {...register('userId', { required: "User ID is required." })}
                    variants={inputVariants}
                    whileFocus="focus"
                />
                {errors.userId && <p className="mt-2 text-sm text-red-500">{errors.userId.message}</p>}
            </div>

            {/* Title Field */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">
                    Title
                </label>
                <motion.input
                    type="text"
                    id="title"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    {...register('title', { required: "Title is required." })}
                    variants={inputVariants}
                    whileFocus="focus"
                />
                {errors.title && <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>}
            </div>

            {/* Body Field */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="body">
                    Body
                </label>
                <Textarea
                    id="body"
                    className="h-40 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
                    {...register('body', { required: "Body is required." })}
                />
                {errors.body && <p className="mt-2 text-sm text-red-500">{errors.body.message}</p>}
            </div>

            {/* Tags Field */}
            <div>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="tags">
                    Tags (comma separated)
                </label>
                <motion.input
                    type="text"
                    id="tags"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    {...register('tags', { required: "Tags are required." })}
                    variants={inputVariants}
                    whileFocus="focus"
                />
                {errors.tags && <p className="mt-2 text-sm text-red-500">{errors.tags.message}</p>}
            </div>

            {/* Submit Button */}
            <motion.button
                type="submit"
                className={`w-full rounded-xl py-4 font-bold text-white transition-colors duration-300 ${
                    isEdit ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
            >
                {isEdit ? "Save Changes" : "Add Post"}
            </motion.button>
        </motion.form>
    );
};

export default PostForm;