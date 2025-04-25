import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-pink-600">skyblog</h1>
      <div className="space-x-4">
        <Link
          to="/"
          className="text-gray-700 hover:text-pink-600 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/create"
          className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
        >
          New Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
