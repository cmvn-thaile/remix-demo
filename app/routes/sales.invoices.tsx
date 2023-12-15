import { type LoaderFunction, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "~/server/prisma.server";

export const loader: LoaderFunction = async () => {
  const invoices = await prisma.invoices.findMany();
  return json(invoices);
};
interface Invoice {
  id: string;
  title: string;
  total: number;
}

export default function Invoices() {
  const invoices = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="flex">
        <div className="mr-5">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-xl text-gray-400">
              INVOICE LIST
            </h3>
            <Link to={"/sales/invoices/create"}>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
           focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  ml-10"
              >
                Create
              </button>
            </Link>
          </div>
          <ul className="px-3 border border-gray-200 rounded-md">
            {invoices &&
              invoices?.map((invoice: Invoice) => (
                <Link
                  key={invoice.id}
                  prefetch="intent"
                  to={`/sales/invoices/${invoice.id}`}
                  className="flex gap-24 items-center border-b p-3 border-gray-200"
                >
                  <div>
                    <h4 className="font-bold">{invoice.title}</h4>
                    <p className="text-sm text-gray-400">{invoice.id}</p>
                  </div>
                  <span className="font-bold">${invoice.total}</span>
                </Link>
              ))}
          </ul>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
