"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

// Dummy product data
const dummyProducts = [
  {
    id: 1,
    name: "Product 1",
    description:
      "This is a cool product with high-quality fabric, very comfortable to wear.",
    image: "../Shirt.jpg",
    quantity: 256,
    price: 1000,
    color: "Red",
    size: "M",
    category: "Shirts",
    addedDate: new Date("2023-10-01"), // Recently added
  },
  {
    id: 2,
    name: "Product 2",
    description:
      "Stylish product, made from the best materials and perfect for all occasions.",
    image: "../Shirt.jpg",
    quantity: 256,
    price: 1000,
    color: "Blue",
    size: "L",
    category: "Pants",
    addedDate: new Date("2023-09-15"), // Older product
  },
  {
    id: 3,
    name: "Product 3",
    description: "Elegant clothing combining comfort and fashion in one.",
    image: "../Shirt.jpg",
    quantity: 256,
    price: 1000,
    color: "Green",
    size: "S",
    category: "Dresses",
    addedDate: new Date("2023-10-05"), // Recently added
  },
  {
    id: 4,
    name: "Product 4",
    description: "A versatile product suitable for all seasons.",
    image: "../Shirt.jpg",
    quantity: 0, // Out of stock
    price: 1200,
    color: "Yellow",
    size: "XL",
    category: "Shirts",
    addedDate: new Date("2023-10-10"), // Recently added
  },
];

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<
    Omit<Product, "id" | "addedDate">
  >({
    name: "",
    description: "",
    image: "",
    quantity: 0,
    price: 0,
    color: "",
    size: "",
    category: "",
    stockStatus: "In Stock",
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // Track the product being edited

  // Filter state
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: [500, 5000],
    color: "Any",
    size: "Any",
    availability: "Any",
    recentlyAdded: false,
  });

  // Handlers for product updates
  // Fix handler parameter types
  const handleQuantityChange = (id: number, value: string) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, quantity: parseInt(value) || 0 } : product
    );
    setProducts(updatedProducts);
  };
  
  const handlePriceChange = (id: number, value: string) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, price: parseInt(value) || 0 } : product
    );
    setProducts(updatedProducts);
  };
  
  const handleAddToStore = (id: number) => {
    toast.success(`Product ${id} added to store!`, { position: "top-center" });
  };
  
  const handleUpdate = (id: number) => {
    const productToEdit = products.find((product) => product.id === id);
    setEditingProduct(productToEdit || null); // Set the product to be edited, defaulting to null if undefined
  };
  
  const handleSaveUpdate = () => {
    if (editingProduct) {
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
      toast.success("Product updated successfully!", { position: "top-center" });
    }
  };
  
  const handleDelete = (id: number) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    toast.error(`Product ${id} deleted!`, { position: "top-center" });
  };

  const handleAddProduct = () => {
    const { name, description, image, color, size, category, quantity, price } =
      newProduct;

    // if (!name || !description || !image || !color || !size || !category) {
    //   toast.warning("Please fill all required fields!", { position: "top-center" });
    //   return;
    // }

    const newId =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const productToAdd = {
      id: newId,
      name,
      description,
      image,
      quantity: parseInt(quantity.toString()),
      price: parseInt(price.toString()),
      color,
      size,
      category,
      stockStatus: quantity > 0 ? "In Stock" : "Out of Stock", // Set stock status based on quantity
      addedDate: new Date(), // Set the current date as the added date
    };

    setProducts([...products, productToAdd]);
    setNewProduct({
      name: "",
      description: "",
      image: "",
      quantity: 0,
      price: 0,
      color: "",
      size: "",
      category: "",
      stockStatus: "In Stock", // Reset stock status
    });
    toast.success("New product added successfully!", {
      position: "top-center",
    });
    setShowAddProductForm(false);

    // Debugging: Log the updated products array
    console.log("Updated Products:", [...products, productToAdd]);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filters.category === "All" || product.category === filters.category;
    const matchesPriceRange =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];
    const matchesColor =
      filters.color === "Any" || product.color === filters.color;
    const matchesSize = filters.size === "Any" || product.size === filters.size;
    const matchesAvailability =
      filters.availability === "Any" ||
      (filters.availability === "In Stock" && product.quantity > 0) ||
      (filters.availability === "Out of Stock" && product.quantity === 0);
    const matchesRecentlyAdded =
      !filters.recentlyAdded ||
      (filters.recentlyAdded &&
        new Date(product.addedDate) >
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

    return (
      matchesCategory &&
      matchesPriceRange &&
      matchesColor &&
      matchesSize &&
      matchesAvailability &&
      matchesRecentlyAdded
    );
  });

  // Debugging: Log the filtered products array
  console.log("Filtered Products:", filteredProducts);

  // Handle filter changes
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, priceRange: [500, parseInt(e.target.value)] });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, color: e.target.value });
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ ...filters, size: e.target.value });
  };

  const handleAvailabilityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters({ ...filters, availability: e.target.value });
  };

  const handleRecentlyAddedChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters({ ...filters, recentlyAdded: e.target.checked });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: "All",
      priceRange: [500, 5000],
      color: "Any",
      size: "Any",
      availability: "Any",
      recentlyAdded: false,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 mt-8">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="hidden md:block md:w-64 mr-4 sticky top-24 h-fit">
          <div className="bg-white shadow rounded-lg p-4 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Filter Clothing</h3>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={filters.category}
                onChange={handleCategoryChange}
                className="border border-gray-300 rounded w-full p-2"
              >
                <option value="All">All</option>
                <option value="Shirts">Shirts</option>
                <option value="Pants">Pants</option>
                <option value="Dresses">Dresses</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Price Range
              </label>
              <input
                type="range"
                min="500"
                max="5000"
                value={filters.priceRange[1]}
                onChange={handlePriceRangeChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Rs. 500</span>
                <span>Rs. {filters.priceRange[1]}</span>
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <select
                value={filters.color}
                onChange={handleColorChange}
                className="border border-gray-300 rounded w-full p-2"
              >
                <option value="Any">Any</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
                <option value="Black">Black</option>
                <option value="White">White</option>
              </select>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Size</label>
              <select
                value={filters.size}
                onChange={handleSizeChange}
                className="border border-gray-300 rounded w-full p-2"
              >
                <option value="Any">Any</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={handleAvailabilityChange}
                className="border border-gray-300 rounded w-full p-2"
              >
                <option value="Any">Any</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            {/* Recently Added Filter */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={filters.recentlyAdded}
                onChange={handleRecentlyAddedChange}
                className="mr-2"
              />
              <label className="text-sm">Recently Added</label>
            </div>

            {/* Reset Filters */}
            <button
              onClick={resetFilters}
              className="mt-4 bg-black text-white px-4 py-2 rounded w-full"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Product List */}
        <div className="flex-1 space-y-8 mt-12">
          {filteredProducts.map((product) => (
            <div key={product.id} className="mb-8">
              <div className="bg-white rounded-lg p-6 shadow flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
                {/* Product Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  width={112}
                  height={112}
                  className="object-cover rounded mx-auto md:mx-0"
                />

                {/* Product Details */}
                <div className="flex-1 flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0 md:space-x-4">
                  {/* Info Section */}
                  <div className="flex-1 space-y-2">
                    <h2 className="font-bold text-lg text-center md:text-left">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Color:</span>{" "}
                      {product.color}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Size:</span>{" "}
                      {product.size}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">Stock:</span>{" "}
                      {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>

                  {/* Quantity and Price Inputs */}
                  <div className="flex flex-col space-y-4 items-center md:items-start">
                    <div className="flex flex-col">
                      <label className="font-semibold mb-1">Quantity</label>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(product.id, e.target.value)
                        }
                        className="border border-gray-300 px-3 py-2 w-32 rounded"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="font-semibold mb-1">Price</label>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) =>
                          handlePriceChange(product.id, e.target.value)
                        }
                        className="border border-gray-300 px-3 py-2 w-32 rounded"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2 items-center md:items-start">
                    <button
                      onClick={() => handleAddToStore(product.id)}
                      className="bg-black text-white px-4 py-2 rounded w-40"
                    >
                      Add to Store
                    </button>

                    <button
                      onClick={() => handleUpdate(product.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded w-40"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded w-40"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Edit Product Form */}
              {editingProduct && editingProduct.id === product.id && (
                <div className="bg-white rounded-lg shadow-md p-6 mt-4">
                  <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          name: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded p-2"
                    />

                    <input
                      type="text"
                      placeholder="Image URL"
                      value={editingProduct.image}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          image: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded p-2"
                    />

                    <textarea
                      placeholder="Description"
                      value={editingProduct.description}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          description: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded p-2 md:col-span-2"
                    />

                    <input
                      type="text"
                      placeholder="Color"
                      value={editingProduct.color}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          color: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded p-2"
                    />

                    <input
                      type="text"
                      placeholder="Size"
                      value={editingProduct.size}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          size: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded p-2"
                    />

                    <div className="flex flex-col">
                      <label className="font-semibold mb-1">Stock Status</label>
                      <select
                        value={
                          editingProduct.quantity > 0
                            ? "In Stock"
                            : "Out of Stock"
                        }
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            quantity: e.target.value === "In Stock" ? 1 : 0,
                          })
                        }
                        className="border border-gray-300 rounded p-2"
                      >
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>

                    <input
                      type="number"
                      placeholder="Quantity"
                      value={editingProduct.quantity}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          quantity: parseInt(e.target.value) || 0,
                        })
                      }
                      className="border border-gray-300 rounded p-2"
                    />

                    <input
                      type="number"
                      placeholder="Price"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: parseInt(e.target.value) || 0,
                        })
                      }
                      className="border border-gray-300 rounded p-2"
                    />
                  </div>

                  <button
                    onClick={handleSaveUpdate}
                    className="bg-green-600 text-white px-6 py-2 rounded mt-4"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Add Product Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAddProductForm(!showAddProductForm)}
              className="bg-black text-white px-6 py-3 rounded"
            >
              {showAddProductForm ? "Close Add Product Form" : "Add Product"}
            </button>
          </div>

          {/* Add Product Form */}
          {showAddProductForm && (
            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="border border-gray-300 rounded p-2"
                />

                <input
                  type="text"
                  placeholder="Image URL"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  className="border border-gray-300 rounded p-2"
                />

                <textarea
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                  className="border border-gray-300 rounded p-2 md:col-span-2"
                />

                <input
                  type="text"
                  placeholder="Color"
                  value={newProduct.color}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, color: e.target.value })
                  }
                  className="border border-gray-300 rounded p-2"
                />

                <input
                  type="text"
                  placeholder="Size"
                  value={newProduct.size}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, size: e.target.value })
                  }
                  className="border border-gray-300 rounded p-2"
                />

                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Stock Status</label>
                  <select
                    value={newProduct.stockStatus}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        stockStatus: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded p-2"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>

                <input
                  type="number"
                  placeholder="Quantity"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })
                  }
                  className="border border-gray-300 rounded p-2"
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: parseInt(e.target.value) || 0 })
                  }
                  className="border border-gray-300 rounded p-2"
                />
              </div>

              <button
                onClick={handleAddProduct}
                className="bg-green-600 text-white px-6 py-2 rounded mt-4"
              >
                Add Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  quantity: number;
  price: number;
  color: string;
  size: string;
  category: string;
  addedDate: Date;
  stockStatus?: string;
}

// interface Filters {
//   category: string;
//   priceRange: number[];
//   color: string;
//   size: string;
//   availability: string;
//   recentlyAdded: boolean;
// }
