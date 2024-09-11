"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Home() {
  const APIBASE = process.env.NEXT_PUBLIC_BASE_PATH;

  console.log(`${APIBASE}/api/category`);
  const [category, setCategory] = useState([]);
  const [updateForm, setUpdateForm] = useState(false);
  const { register, handleSubmit, setValue, reset } = useForm();
  const [idToBeUpdated, setIdToBeUpdated] = useState();

  async function fetchCategory() {
    const data = await fetch(`${APIBASE}/api/category`);
    const c = await data.json();
    setCategory(c);
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  function createOrUpdateCategory(data) {
    data = { ...data, _id: idToBeUpdated };
    if (updateForm) {
      // update category
      fetch(`${APIBASE}/api/category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => fetchCategory());
      return;
    }

    console.log(APIBASE);
    fetch(`${APIBASE}/api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchCategory());
  }

  function startEdit(category) {
    console.debug(category);
    setIdToBeUpdated(category._id);
    // setValue("name", category.name)
    reset({ name: category.name });
    setUpdateForm(true);
  }

  return (
    <main>
      <div className="border border-black w-1/4 m-4">
        <form onSubmit={handleSubmit(createOrUpdateCategory)}>
          <div className="grid grid-cols-2 gap-4 w-fit m-4">
            <div>Category:</div>
            <div>
              <input
                name="name"
                type="text"
                {...register("name", { required: true })}
                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>Order:</div>
            <div>
              <input
                name="order"
                type="number"
                {...register("order", { required: true })}
                className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="col-span-2">
              <input
                type="submit"
                value={updateForm ? "Update" : "Add"}
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              />
            </div>
            <div className="col-span-2">
              {updateForm && (
                <button
                  type="submit"
                  onClick={() => setUpdateForm(false)}
                  className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      <div>
        <h1>Category {category.length}</h1>
        {category.map((category) => (
          <div key={category._id}>
            <button
              className="border border-gray-400 p-1 m-2"
              onClick={() => startEdit(category)}
            >
              Edit
            </button>
            <Link
              href={`/product/category/${category._id}`}
              className="text-red-600"
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
