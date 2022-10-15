import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div className="flex gap-12 text-xs uppercase">
        <Link
          to="/sent"
          className="flex-1 p-4 bg-white rounded-t-md border-t border-slate-400"
        >
          Requests
        </Link>
        <Link
          to="/pay"
          className="flex-1 p-4 bg-white rounded-t-md border-t border-slate-400"
        >
          Received
        </Link>
        <Link
          to="/about"
          className="flex-1 p-4 bg-white rounded-t-md border-t border-slate-400"
        >
          About
        </Link>
      </div>
    </div>
  );
}
