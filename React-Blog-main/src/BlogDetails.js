
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isPending, error } = useFetch("http://localhost:8000/blogs/" + id);
  const history = useHistory();

  const handleDelete = () => {
    fetch("http://localhost:8000/blogs/" + blog.id, {
      method: "DELETE",
    }).then(() => {
      history.push("/Home");
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      {isPending && <div className="text-gray-500">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {blog && (
        <article className="mb-10 border-b border-gray-100 pb-6">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">{blog.title}</h2>
          
          {/* Affichage de la catégorie */}
          <p className="text-sm text-gray-500 mb-4">Category: {blog.category}</p>

          {blog.img && (
            <img
              src={blog.img}
              alt={`Image for ${blog.title}`}
              className="w-full h-auto rounded-lg mb-4"
            />
          )}
          
          <div className="text-gray-700 leading-relaxed mb-6">{blog.body}</div>
          <button
            onClick={handleDelete}
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-4 py-2 rounded-md transition duration-200"
          >
            Delete
          </button>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
