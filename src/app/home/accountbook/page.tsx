"use client";
import React, { useState } from "react";
import { Card, CardHeader } from "~/components/ui/card";
import PageHeader from "~/components/PageHeader";
import { FaBook } from "react-icons/fa";
import AppTable from "~/components/Table";
import { FaPlus } from "react-icons/fa";
import Backdrop from "~/components/Backdrop";

const page = () => {
  const ledgerData = [
    ["1", "Investors", "-", "400,000", "0.00"],
    ["2", "Buyer", "1,788,000", "-", "0.00"],
    ["3", "Employee", "10,000", "-", "0.00"],
  ];
  const headers = ["No.", "Account Book Name", "Debit", "Credit", "Balance"];
  const buttons = ledgerData.map((i, k) => [
    {
      label: "Detail",
      className: "bg-blue-500 text-white px-3 py-2 rounded mr-1",
      actionType: "DETAIL",
    },
  ]);
  const [isNewLedgerOpen, setIsNewLedgerOpen] = useState(false);
  const [isCashPaymentOpen, setIsCashPaymentOpen] = useState(false);
  const [isCashReceivedOpen, setIsCashReceivedOpen] = useState(false);

  const onCloseNewLedger = () => {
    setIsNewLedgerOpen(false);
  };
  const onCloseCashPayment = () => {
    setIsCashPaymentOpen(false);
  };
  const onCloseCashReceived = () => {
    setIsCashReceivedOpen(false);
  };

  const openNewLedger = () => {
    setIsNewLedgerOpen(true);
  };
  const openCashPayment = () => {
    setHeading("Add Cash Payment");
    setIsCashPaymentOpen(true);
  };
  const openCashReceived = () => {
    setHeading("Add Cash Receive");
    setIsCashReceivedOpen(true);
  };
  const [heading, setHeading] = useState("");
  return (
    <>
      <Backdrop isOpen={isNewLedgerOpen} onClose={onCloseNewLedger}>
        <Card>
          <div className="flex w-[30rem] flex-col gap-3 p-5">
            <h1 className="mb-5 text-3xl">Add Account Book Detail</h1>
            <div>
              <p>Account Book Name</p>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div className="mt-5 flex justify-between">
              <button
                className="rounded bg-blue-500 px-3 py-2"
                onClick={() => setIsNewLedgerOpen(false)}
              >
                Save
              </button>
              <button
                className="rounded bg-red-500 px-3 py-2"
                onClick={() => setIsNewLedgerOpen(false)}
              >
                Exit
              </button>
            </div>
          </div>
        </Card>
      </Backdrop>

      <Backdrop
        isOpen={isCashPaymentOpen || isCashReceivedOpen}
        onClose={onCloseCashPayment || onCloseCashReceived}
      >
        <Card>
          <div className="flex w-[30rem] flex-col gap-3 p-5">
            <h1 className="mb-5 text-3xl">{heading}</h1>
            <div>
              <p>Date</p>
              <input
                type="date"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>

            <div>
              <p>Account Book</p>
              <select className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm">
                <option value="">Choose</option>
              </select>
            </div>

            <div>
              <p>Choose Party</p>
              <select className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm">
                {" "}
              </select>
            </div>

            <div>
              <p>Amount</p>
              <input
                type="number"
                min="0"
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
                onClick={() => {
                  setIsCashPaymentOpen(false);
                  setIsCashReceivedOpen(false);
                }}
              >
                Save
              </button>
              <button
                className="rounded bg-red-500 px-3 py-2"
                onClick={() => {
                  setIsCashPaymentOpen(false);
                  setIsCashReceivedOpen(false);
                }}
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
              icon={<FaBook className="text-4xl" />}
              title="Account Books"
            />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-end gap-2">
              <button
                onClick={openNewLedger}
                className="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:opacity-90"
              >
                <FaPlus className="mr-2" />
                New Ledger
              </button>
              <button
                onClick={openCashPayment}
                className="flex items-center rounded bg-red-500 px-4 py-2 text-white hover:opacity-90"
              >
                Cash Payment
              </button>
              <button
                onClick={openCashReceived}
                className="flex items-center rounded bg-green-500 px-4 py-2 text-white hover:opacity-90"
              >
                Cash Received
              </button>
              <button className="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:opacity-90">
                Trial Balance
              </button>
              <button className="flex items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Balance Sheet
              </button>
              <button className="flex items-center rounded bg-blue-500 px-4 py-2 text-white hover:opacity-90">
                Daily Cash
              </button>
            </div>
            <AppTable data={ledgerData} headers={headers} buttons={buttons} />
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default page;
