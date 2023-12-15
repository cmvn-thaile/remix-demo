import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData, useRouteError } from "@remix-run/react";

import { prisma } from "~/server/prisma.server";

export const loader: LoaderFunction = async ({ params }) => {
  const error = false;

  if (error) {
    throw new Error("Something went wrong");
  }
  const invoice = await prisma.invoices.findUnique({
    where: {
      id: params.invoiceId,
    },
  });

  return json(invoice);
};

export function ErrorBoundary({ error }: any) {
  return (
    <div className="bg-red-100 border border-red-300 p-4 max-h-[150px]">
      <h1 className="text-2xl">Something went wrong!</h1>
      <p>{error?.message}</p>
    </div>
  );
}

export default function Invoice() {
  const invoice = useLoaderData<typeof loader>();
  const error: any = useRouteError();

  return (
    <div className="p-4">
      {error && <ErrorBoundary error={error} />}
      <h4 className="text-sm font-bold">{invoice.title}</h4>
      <h2 className="text-4xl font-bold">${invoice.total}</h2>
    </div>
  );
}
