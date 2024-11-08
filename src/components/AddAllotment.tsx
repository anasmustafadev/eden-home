"use client";
import React, { useState } from "react";
import Backdrop from "~/components/Backdrop";
import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import AddClient from "./AddClient";

interface AddAllotmentProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (type: boolean) => void;
}

const AddAllotment = ({ isOpen, onClose, setIsOpen }: AddAllotmentProps) => {
  const defaultValue = {
    date: "",
    accountBook: "",
    client: "",
    plot: "",
    // heirsName: "",
    // contactNumber: "",
    // cnic: "",
    // address: "",
    ratePerMarla: "",
    totalPrice: 0,
    advancePercent: 10,
    amount: 0,
    numOfMonths: 60,
    installmentType: "monthly",
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

    setFormData(() => defaultValue);
    onClose();
  };

  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  const onAddClientClose = () => {
    setIsAddClientOpen(false);
  };

  const openAddClientBackdrop = () => {
    onClose();
    setIsAddClientOpen(true);
  };
  return (
    <div>
      <AddClient
        isOpen={isAddClientOpen}
        onClose={onAddClientClose}
        setIsOpen={setIsAddClientOpen}
        isModalAdd={true}
        updateData={["", ""]}
      />
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card className="flex h-[90vh] w-[30rem] flex-col gap-3 overflow-y-auto p-5">
          <CardHeader className="flex">
            <CardTitle className="mx-auto mb-2 text-3xl">
              Add New Allotment Detail
            </CardTitle>
          </CardHeader>
          <div className="flex justify-end">
            <button
              onClick={openAddClientBackdrop}
              className="text-blue-500 hover:text-blue-700 hover:underline"
              style={{ color: "rgba(75, 192, 192, 1)" }}
            >
              New Client
            </button>
          </div>
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
              value={formData.accountBook}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            >
              <option value="">Select Account Book</option>
              <option value="purchaser">Purchaser</option>
              <option value="investor">Investor</option>
              <option value="employees">Employees</option>
              <option value="banks">Banks</option>
            </select>
          </div>
          <div>
            <p>Client</p>
            <select
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            ></select>
          </div>
          <div>
            <p>Plot</p>
            <select
              name="plot"
              value={formData.plot}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            >
              <option value="">Choose</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <p>Length:</p>
            <p>Feet</p>
            <input
              type="number"
              disabled={true}
              min="0"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-slate-200 px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
            <p>Inches</p>
            <input
              type="number"
              disabled={true}
              min="0"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-slate-200 px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Width:</p>
            <p>Feet</p>
            <input
              type="number"
              disabled={true}
              min="0"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-slate-200 px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
            <p>Inches</p>
            <input
              type="number"
              disabled={true}
              min="0"
              className="mt-1 block w-full rounded-md border border-slate-300 bg-slate-200 px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            />
          </div>
          {/* <div className="flex justify-between">
            <div>
              <p>Heirs Name</p>
              <input
                name="heirsName"
                value={formData.heirsName}
                onChange={handleChange}
                type="text"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <p>Contact Number</p>
              <input
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                type="text"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p>CNIC</p>
              <input
                name="cnic"
                value={formData.cnic}
                onChange={handleChange}
                type="text"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <p>Address</p>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
          </div> */}
          <div className="flex justify-between">
            <div>
              <p>Rate per marla</p>
              <input
                name="ratePerMarla"
                value={formData.ratePerMarla}
                onChange={handleChange}
                type="number"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <p>Total Price</p>
              <input
                name="totalPrice"
                type="number"
                min="0"
                value={formData.totalPrice}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p>Advance %</p>
              <input
                name="advancePercent"
                value={formData.advancePercent}
                onChange={handleChange}
                type="number"
                min="0"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <p>Amount</p>
              <input
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                type="number"
                min="0"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p>Number of Months</p>
              <input
                name="numOfMonths"
                value={formData.numOfMonths}
                onChange={handleChange}
                type="number"
                min="0"
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <p>Type of Installment</p>
              <select
                name="installmentType"
                value={formData.installmentType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              >
                <option value="monthly">Monthly</option>
                <option value="3month">3 Month</option>
                <option value="6month">6 Month</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <CardFooter className="mt-5 w-full">
            <div className="flex w-full justify-between">
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
                  setFormData(defaultValue);
                }}
              >
                Exit
              </button>
            </div>
          </CardFooter>
        </Card>
      </Backdrop>
    </div>
  );
};

export default AddAllotment;
