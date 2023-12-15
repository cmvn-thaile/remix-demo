import { type ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { prisma } from "~/server/prisma.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title: any = formData.get("title");
  const total = Number(formData.get("total"));
  const action = formData.get("_action");
  console.log("FORM", action);

  await prisma.invoices.create({ data: { title, total } });
  return redirect("/sales/invoices");
};
export default function InvoiceCreate() {

  return (
    <div
      aria-hidden="true"
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
     w-[350px] flex flex-col shadow-md bg-white"
    >
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Create
        </h3>
        <Form navigate={true} action="/sales/invoices">
          <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </Form>
      </div>

      <Form className="mt-4 py-4 px-6 " method="post">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            name="title"
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
             dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
            required
          />
        </div>
        <div>
          <label
            htmlFor="total"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Total
          </label>
          <input
            name="total"
            type="text"
            id="total"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
             dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Total"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
           focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6"
        >
          Submit
        </button>
      </Form>
    </div>
  );
}
