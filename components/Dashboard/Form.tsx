'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

// Define the schema using Zod
const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  price: z.number().min(1, "Price must be greater than 0"),
  category: z.string(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Enter a valid image URL"),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Product added successfully!");
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white rounded shadow-md space-y-4">
      <div>
        <label className="block text-gray-700">Product Name</label>
        <input {...register("name")} className="border p-2 w-full" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700">Price</label>
        <input type="number" {...register("price", { valueAsNumber: true })} className="border p-2 w-full" />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700">Category</label>
        <select {...register("category")} className="border p-2 w-full">
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700">Description</label>
        <textarea {...register("description")} className="border p-2 w-full"></textarea>
        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700">Image URL</label>
        <input {...register("image")} className="border p-2 w-full" />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </button>
    </form>
  );
};

export default AddProductForm;