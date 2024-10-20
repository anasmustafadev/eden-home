"use client";
import React, { useState } from "react";
import Backdrop from "~/components/Backdrop";
import { Card, CardHeader, CardTitle } from "./ui/card";

interface AddMultiInstallmentProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (type: boolean) => void;
}

const AddMultiInstallment = ({
  isOpen,
  onClose,
  setIsOpen,
}: AddMultiInstallmentProps) => {
  const defaultValue = {
    date: "",
    accountBook: "",
    party: "",
    amount: 0,
    description: "",
  };
  const [formData, setFormData] = useState(defaultValue);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission
    onClose();
  };
  return (
    <div>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card>
          <div className="flex w-[30rem] flex-col gap-3 p-5">
            <CardHeader className="flex">
              <CardTitle className="mb-5 text-center text-3xl">
                Add Multiple Installments of a Client
              </CardTitle>
            </CardHeader>
            <div>
              <p>Date</p>
              <input
                name="date"
                onChange={handleChange}
                value={formData.date}
                type="date"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <p>Account Book</p>
              <select
                name="accountBook"
                onChange={handleChange}
                value={formData.accountBook}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              >
                <option value="">Choose</option>
              </select>
            </div>
            <div>
              <p>Party</p>
              <select
                name="party"
                onChange={handleChange}
                value={formData.party}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              >
                <option value="">Choose</option>
              </select>
            </div>
            <div className="flex justify-between">
              <div>
                <p>Amount</p>
                <input
                  name="amount"
                  onChange={handleChange}
                  value={formData.amount}
                  type="number"
                  min="0"
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
              <div>
                <p>Description</p>
                <input
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                  type="text"
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-5 flex justify-between">
              <button
                className="rounded-lg border-2 border-blue-500 px-4 py-2 font-semibold text-blue-500 transition-colors duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="rounded-lg border-2 border-red-500 px-4 py-2 font-semibold text-red-500 transition-colors duration-300 ease-in-out hover:bg-red-500 hover:text-white"
                onClick={() => {
                  setIsOpen(false);
                  setFormData((prev) => {
                    return { ...prev, defaultValue };
                  });
                }}
              >
                Exit
              </button>
            </div>
          </div>
        </Card>
      </Backdrop>
    </div>
  );
};

export default AddMultiInstallment;
