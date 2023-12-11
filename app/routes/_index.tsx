import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet, useLocation } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Layout() {
  return <Outlet />;
}
