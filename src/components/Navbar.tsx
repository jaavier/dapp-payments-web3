import { Link, useLocation } from "react-router-dom";

const menu: Record<string, any>[] = [
  {
    name: "create",
    label: "Create",
  },
  {
    name: "sent",
    label: "Sent",
  },
  {
    name: "pay",
    label: "Received",
  },
  {
    name: "about",
    label: "About",
  },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <div>
      <div className="flex text-xs uppercase rounded-t-md border-t border-l border-r border-slate-300 shadow-lg w-full text-center">
        {menu.map(({ name, label }: any, index: number) => (
          <Link
            key={index}
            to={`/${name}`}
            className={`p-4 border-r border-l w-24 ${
              location.pathname === `/${name}`
                ? "bg-gradient-to-bl from-blue-50 to-blue-300 text-blue-700"
                : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
