import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const currentPath = pathname.split("/")[1];
  const activeClass = `bg-gray-200 font-bold py-2 ml-[-2px] border rounded-md`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className=" w-full min-h-full h-full flex flex-col">
        <div className="flex">
          <aside className="h-[800px] w-[200px] bg-gray-100 flex border-l border-gray-500">
            <ul className=" w-full p-4 font-medium flex flex-col gap-6">
              <Link
                to={"/dashboard"}
                className={currentPath === "dashboard" ? `${activeClass}` : ""}
              >
                <li className="pl-2">Dashboard</li>
              </Link>
              <Link
                to={"/accounts"}
                className={currentPath === "accounts" ? `${activeClass}` : ""}
              >
                <li className="pl-2">Accounts</li>
              </Link>
              <Link
                to={"/sales"}
                className={currentPath === "sales" ? `${activeClass}` : ""}
              >
                <li className="pl-2">Sales</li>
              </Link>
              <Link
                to={"/reports"}
                className={currentPath === "reports" ? `${activeClass}` : ""}
              >
                <li className="pl-2">Report</li>
              </Link>
            </ul>
          </aside>
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
