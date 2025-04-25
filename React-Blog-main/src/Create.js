import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [photo, setPhoto] = useState(''); 
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState(''); 
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
     
      setPreview(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author, img: photo, category };

    setIsPending(true);
    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log('Blog added');
      setIsPending(false);
      history.push('/Home');
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl text-center">
      <h2 className="text-2xl font-semibold text-pink-600 mb-6">Add a Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Blog Title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Blog Body:</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            rows={5}
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Author:</label>
          <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          />
        </div>

        {/* Category Input */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Category:</label>
          <select
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">Select Category</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Health">Health</option>
            <option value="Business">Business</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-600">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
          />
          {preview && (
            <img src={preview} alt="Preview" className="mt-4 rounded-lg max-h-40 object-cover" />
          )}
        </div>

        <div className="text-center mt-6">
          {!isPending && (
            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors"
            >
              Add Blog
            </button>
          )}
          {isPending && (
            <button
              disabled
              className="bg-gray-400 text-white px-6 py-2 rounded-full cursor-not-allowed"
            >
              Adding Blog...
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Create;
