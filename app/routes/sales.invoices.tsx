import { LoaderFunction, json } from "@remix-run/node";
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
      <h3 className="font-semibold text-xl text-gray-400 mb-5">INVOICE LIST</h3>
      <div className="flex">
        <ul className="px-3 border border-gray-200 rounded-md">
          {invoices &&
            invoices?.map((invoice: Invoice) => (
              <Link
                key={invoice.id}
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
        <Outlet />
      </div>
    </div>
  );
}
