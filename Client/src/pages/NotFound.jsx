import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
      {/* Big 404 */}
      <h1 className="text-7xl font-extrabold tracking-widest text-red-500">
        404
      </h1>

      {/* Message */}
      <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>

      <p className="mt-2 text-gray-400 max-w-sm">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Action buttons */}
      <div className="mt-6 flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition"
        >
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 rounded-full border border-gray-600 hover:bg-gray-800 transition"
        >
          Go Back
        </button>
      </div>

      {/* Footer text */}
      <p className="mt-10 text-sm text-gray-500">Lost in the app? 👀</p>
    </div>
  );
};

export default NotFound;
