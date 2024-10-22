"use client";
import React, { useEffect, useState } from "react";
import Backdrop from "~/components/Backdrop";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";

interface AddClientProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (type: boolean) => void;
  isModalAdd: boolean;
  updateData: (string | number)[];
}

const AddClient = ({
  isOpen,
  onClose,
  setIsOpen,
  isModalAdd,
  updateData,
}: AddClientProps) => {
  interface Form {
    type: number;
    name: string;
    cnic: string;
    address: string;
    phone: string;
  }

  const defaultValue = {
    type: 0,
    name: "",
    cnic: "",
    phone: "",
    address: "",
  };

  const [form, setForm] = useState<Form>(defaultValue);
  useEffect(()=>{
    if(isModalAdd==false){
      const updatedForm = {
        type: Number(updateData[0]),
        name: String(updateData[1]),
        cnic: String(updateData[2]),
        phone: String(updateData[3]),
        address: String(updateData[4]),
      };
      setForm(updatedForm);
    }
  },[updateData])
  function setFormValue(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.name == "type" ? Number(e.target.value) : e.target.value,
      };
    });
  }
  const handleSubmit = () => {
    if (isModalAdd == true) {
      console.log("Add");
    } else if (isModalAdd == false) {
      console.log(updateData);
      console.log("Update");
    }
    setForm(() => defaultValue);
    onClose();
  };
  return (
    <div>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card className="flex min-w-[20rem] max-w-[30rem] flex-col items-center">
          <CardHeader className="flex">
            <CardTitle className="mx-auto mb-5 text-3xl">Client Menu</CardTitle>
          </CardHeader>
          <CardContent className="flex w-[20rem] flex-col flex-wrap p-5">
            <div className="flex flex-col items-center gap-2">
              <div className="w-full">
                <p>Type</p>
                <select
                  name="type"
                  onChange={setFormValue}
                  value={form.type}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                >
                  <option value={0}>Select Type</option>
                  <option value={1}>Purchaser</option>
                  <option value={2}>Investor</option>
                  <option value={3}>Employees</option>
                  <option value={4}>Banks</option>
                </select>
              </div>
              <div className="w-full">
                <p>Name</p>
                <input
                  placeholder="Residential"
                  type="text"
                  name="name"
                  onChange={setFormValue}
                  value={form.name}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
              <div className="w-full">
                <p>CNIC</p>
                <input
                  placeholder="32203-4060544-5"
                  type="text"
                  name="cnic"
                  onChange={setFormValue}
                  value={form.cnic}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
              <div className="w-full">
                <p>Phone</p>
                <input
                  placeholder="03058111211"
                  type="text"
                  name="phone"
                  onChange={setFormValue}
                  value={form.phone}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
              <div className="w-full">
                <p>Address</p>
                <input
                  placeholder="Layyah"
                  type="text"
                  name="address"
                  onChange={setFormValue}
                  value={form.address}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
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
                    setForm(() => defaultValue);
                  }}
                >
                  Exit
                </button>
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      </Backdrop>
    </div>
  );
};

export default AddClient;
