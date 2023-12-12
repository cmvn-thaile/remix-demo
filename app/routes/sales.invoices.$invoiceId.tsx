import { type LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/server/prisma.server";

export const loader: LoaderFunction = async ({ params }) => {
  const invoice = await prisma.invoices.findUnique({
    where: {
      id: params.invoiceId,
    },
  });

  return json(invoice);
};

export default function Invoice() {
  const invoice = useLoaderData<typeof loader>();

  return <p>Invoice: {invoice.title}</p>;
}
