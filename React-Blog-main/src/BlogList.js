
import { useState } from "react";
import { Link } from "react-router-dom";

const BlogList = ({ blogs, title }) => {
  
  const [selectedCategory, setSelectedCategory] = useState("");
  
  
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredBlogs = selectedCategory
    ? blogs.filter(blog => blog.category === selectedCategory)
    : blogs;

  
  const categories = [...new Set(blogs.map(blog => blog.category))];

  return (
    <div className="max-w-2xl mx-auto px-4 mt-10">
      <h2 className="text-xl font-semibold text-pink-600 mb-6">{title}</h2>

      <div className="mb-6">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {filteredBlogs.map((blog) => (
        <div
          className="mb-6 p-4 border-b border-gray-100 hover:shadow-md transition-shadow duration-200 rounded-lg"
          key={blog.id}
        >
          <Link to={`/blogs/${blog.id}`} className="block text-inherit no-underline">
            <h2 className="text-lg font-medium text-pink-600 mb-2">{blog.title}</h2>
            <p className="text-sm text-gray-500 mb-2">Written by: {blog.author}</p>
            {/* Affichage de la catégorie */}
            <p className="text-sm text-gray-500 mb-2">Category: {blog.category}</p>
            {blog.img && (
              <img
                src={blog.img}
                alt={`Image for ${blog.title}`}
                className="w-full h-auto rounded-md"
              />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
