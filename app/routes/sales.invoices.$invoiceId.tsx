import { type LoaderFunction, json } from '@remix-run/node';
import {
  useLoaderData,
  useRouteError,
} from '@remix-run/react';

import { prisma } from '~/server/prisma.server';

export const loader: LoaderFunction = async ({ params }) => {
  const error = true;

  if (error) {
    throw new Error('Something went wrong')
  }
  const invoice = await prisma.invoices.findUnique({
    where: {
      id: params.invoiceId,
    },
  });
  console.log('invoice');

  return json(invoice);
};

export function ErrorBoundary({ error }: any) {
  return (
    <div className="bg-red-100 border border-red-300 p-4">
      <h1 className="text-2xl">Something went wrong!</h1>
      <p>{error?.message}</p>
    </div>
  );
}

export default function Invoice() {
  const invoice = useLoaderData<typeof loader>();
  const error = useRouteError();
console.log(error,'hehe')
  return (
    <>
      {error && <ErrorBoundary error={error}/>}
      <p>Invoice: {invoice.title}</p>;
    </>
  );
}
