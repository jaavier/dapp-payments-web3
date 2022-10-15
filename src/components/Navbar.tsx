import { Link, useLocation } from "react-router-dom";

const menu: Record<string, any>[] = [
  {
    name: "create",
    label: "Create",
  },
  {
    name: "sent",
    label: "Requests",
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
      <div className="flex gap-12 text-xs uppercase">
        {menu.map(({ name, label }: any, index: number) => (
          <Link
            key={index}
            to={`/${name}`}
            className={`flex-1 p-4 rounded-t-md border-t border-slate-400 ${
              location.pathname === `/${name}`
                ? "bg-gradient-to-bl from-green-50 to-green-300"
                : "bg-slate-50"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
