import { useState } from "react";

export interface TodoData {
  title: string;
  completed: boolean;
  userId: number;
}

interface TodosFormProps {
  isEdit: boolean;
  mutateFn: (data: TodoData) => void;
}

const TodosForm: React.FC<TodosFormProps> = ({ isEdit, mutateFn }) => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "") {
      setErrorMessage("Todo tidak boleh kosong!");
      return;
    }

    mutateFn({ title, completed: false, userId: 1 }); // Sesuaikan userId dengan autentikasi
    setTitle("");
    setErrorMessage("");
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        {isEdit ? "Edit Todo" : "Tambah Todo"}
      </h2>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tulis todo Anda..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          {isEdit ? "Simpan Perubahan" : "Tambah Todo"}
        </button>
      </form>
    </div>
  );
};

export default TodosForm;
