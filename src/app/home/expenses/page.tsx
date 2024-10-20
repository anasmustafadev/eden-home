"use client";
import React from "react";
import SimpleTable from "~/components/SimpleTable";
import { Card, CardHeader } from "~/components/ui/card";
import PageHeader from "~/components/PageHeader";
import Backdrop from "~/components/Backdrop";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useState } from "react";

const Page = () => {
  const expenseData = [
    ["No.", "Expense Accounts", "Amount"],
    ["1", "Office Expense", "15,000"],
    ["2", "File Expense", "450,000"],
    ["3", "Total Expense", "465,000"],
  ];

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const openBackdrop = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card>
          <div className="w-[30rem] p-5">
            <h1 className="mb-5 text-3xl">Add Expense</h1>
            <div>
              <p>Date</p>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <p>Amount</p>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <p>Description</p>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div className="mt-5 flex justify-between">
              <button
                className="rounded bg-blue-500 px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Save
              </button>
              <button
                className="rounded bg-red-500 px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Exit
              </button>
            </div>
          </div>
        </Card>
      </Backdrop>

      <div className="flex w-full flex-col gap-5">
        <Card>
          <CardHeader>
            <PageHeader
              icon={<FaMoneyBillAlt className="text-4xl" />}
              title="Expenses"
            />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-end gap-2">
              <button
                onClick={openBackdrop}
                className="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:opacity-90"
              >
                Add Expense Account
              </button>
              <button className="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:opacity-90">
                Print Expenses
              </button>
            </div>
            <SimpleTable data={expenseData} />
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default Page;
