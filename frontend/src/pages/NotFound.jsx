import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-7xl font-bold text-blue-500">404</h1>

      <p className="text-2xl mt-4">
        Page Not Found
      </p>

      <p className="text-gray-400 mt-2">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition"
      >
        Go Home
      </Link>
    </div>
  );
}