import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UseMutateFunction } from "@tanstack/react-query";
import { motion } from "framer-motion";

interface RecipeFormElementProps {
    isEdit: boolean;
    mutateFn: UseMutateFunction<any, Error, Recipe, unknown>;
    defaultInputData?: Recipe;
}

export type RecipeFormFields = {
    name: string;
    ingredients: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    instructions: string[];
};

export type Recipe = RecipeFormFields;

const ingredientOptions = ["Salt", "Sugar", "Flour", "Eggs", "Milk", "Butter", "Cheese", "Chicken", "Beef", "Fish", "Garlic", "Onion", "Pepper", "Olive Oil"];

const RecipeForm: React.FC<RecipeFormElementProps> = (props) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<RecipeFormFields>();
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>(props.defaultInputData?.ingredients || []);
    const [instructions, setInstructions] = useState<string[]>(props.defaultInputData?.instructions || []);

    useEffect(() => {
        if (props.defaultInputData) {
            setValue("name", props.defaultInputData.name);
            setValue("prepTimeMinutes", props.defaultInputData.prepTimeMinutes);
            setValue("cookTimeMinutes", props.defaultInputData.cookTimeMinutes);
            setValue("servings", props.defaultInputData.servings);
            setValue("difficulty", props.defaultInputData.difficulty);
            setValue("cuisine", props.defaultInputData.cuisine);
        }
    }, [props.defaultInputData, setValue]);

    const handleIngredientChange = (ingredient: string) => {
        setSelectedIngredients((prev) =>
            prev.includes(ingredient) ? prev.filter((item) => item !== ingredient) : [...prev, ingredient]
        );
    };

    const handleInstructionChange = (index: number, value: string) => {
        const updatedInstructions = [...instructions];
        updatedInstructions[index] = value;
        setInstructions(updatedInstructions);
    };

    const addInstruction = () => setInstructions([...instructions, ""]);
    const removeInstruction = (index: number) => setInstructions(instructions.filter((_, i) => i !== index));

    const onSubmit: SubmitHandler<RecipeFormFields> = (data) => {
        if (props.isEdit && !confirm("Are you sure you want to update the recipe?")) return;
        props.mutateFn({ ...data, ingredients: selectedIngredients, instructions });
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
            boxShadow: "0 0 0 2px rgba(107, 114, 128, 0.3)", // Gray-300 ring
            transition: { duration: 0.2 },
        },
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.3 },
        },
        tap: { scale: 0.95 },
    };

    const ingredientLabelVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
    };


    return (
        <motion.form
            className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-200"
            onSubmit={handleSubmit(onSubmit)}
            variants={formVariants}
            initial="hidden"
            animate="visible"
        >
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">{props.isEdit ? "Edit Recipe" : "Create New Recipe"}</h2>
            <div className="space-y-6">
                {/* Recipe Name */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Recipe Name</label>
                    <motion.input
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                        type="text"
                        {...register('name', { required: "Name is required." })}
                        variants={inputVariants}
                        whileFocus="focus"
                    />
                </div>

                {/* Ingredients */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Ingredients</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
                        {ingredientOptions.map((ingredient) => (
                            <motion.label
                                key={ingredient}
                                className={`flex items-center space-x-2 bg-gray-50 p-3 rounded-xl shadow-md cursor-pointer border ${
                                    selectedIngredients.includes(ingredient) ? "border-green-500" : "border-transparent"
                                } hover:bg-gray-100 transition-colors`}
                                variants={ingredientLabelVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedIngredients.includes(ingredient)}
                                    onChange={() => handleIngredientChange(ingredient)}
                                    className="w-5 h-5 text-green-600 rounded"
                                />
                                <span className="text-gray-700">{ingredient}</span>
                            </motion.label>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Instructions</label>
                    {instructions.map((instruction, index) => (
                        <div key={index} className="flex space-x-3 mt-3">
                            <motion.input
                                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                                type="text"
                                value={instruction}
                                onChange={(e) => handleInstructionChange(index, e.target.value)}
                                placeholder={`Step ${index + 1}`}
                                variants={inputVariants}
                                whileFocus="focus"
                            />
                            <motion.button
                                type="button"
                                className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-700 focus:outline-none"
                                onClick={() => removeInstruction(index)}
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                Remove
                            </motion.button>
                        </div>
                    ))}
                    <motion.button
                        type="button"
                        className="mt-4 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl focus:outline-none"
                        onClick={addInstruction}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Add Step
                    </motion.button>
                </div>

                {/* Prep Time, Cook Time, Difficulty */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Prep Time (mins)</label>
                        <motion.input
                            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                            type="number"
                            {...register('prepTimeMinutes', { required: "Required." })}
                            variants={inputVariants}
                            whileFocus="focus"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Cook Time (mins)</label>
                        <motion.input
                            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                            type="number"
                            {...register('cookTimeMinutes', { required: "Required." })}
                            variants={inputVariants}
                            whileFocus="focus"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Difficulty</label>
                        <motion.select
                            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                            {...register('difficulty', { required: "Required." })}
                            variants={inputVariants}
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </motion.select>
                    </div>
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors focus:outline-none"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    {props.isEdit ? "Save Changes" : "Add Recipe"}
                </motion.button>
            </div>
        </motion.form>
    );
};

export default RecipeForm;