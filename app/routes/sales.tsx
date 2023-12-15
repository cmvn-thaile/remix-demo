import { Link, Outlet, useLocation } from "@remix-run/react";

export default function Sales() {
  const location = useLocation();
  const pathname = location.pathname;
  const currentPath = pathname.split("/")[2];
  const active = " text-black";

  return (
    <div className=" flex flex-col w-full p-14">
      <p className=" font-bold text-3xl pb-4">
        {pathname.split("/")[1].charAt(0).toUpperCase() +
          pathname.split("/")[1].slice(1)}
      </p>
      <header className=" flex gap-12 mb-4 pb-2 font-semibold text-gray-400 border-b border-gray-200">
        <Link
          className={currentPath === "overview" ? `${active}` : ""}
          to={"/sales/overview"}
        >
          Overview
        </Link>
        <Link
          className={currentPath === "subscription" ? `${active}` : ""}
          to={"/sales/subscription"}
        >
          Subscription
        </Link>
        <Link
          prefetch="intent"
          className={currentPath === "invoices" ? `${active}` : ""}
          to={"/sales/invoices"}
        >
          Invoices
        </Link>
        <Link
          prefetch="intent"
          className={currentPath === "customers" ? `${active}` : ""}
          to={"/sales/customers"}
        >
          Customers
        </Link>
        <Link
          className={currentPath === "deposits" ? `${active}` : ""}
          to={"/sales/deposits"}
        >
          Deposits
        </Link>
      </header>
      <Outlet />
    </div>
  );
}
