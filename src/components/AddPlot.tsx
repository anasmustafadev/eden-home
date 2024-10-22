import React, { useState, useEffect } from "react";
import Backdrop from "./Backdrop";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { ChangeEvent } from "react";
interface AddPlotProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: (type: boolean) => void;
  isModalAdd: boolean;
  updateData: (string | number)[];
}
const AddPlot = ({
  isOpen,
  onClose,
  setIsOpen,
  isModalAdd,
  updateData,
}: AddPlotProps) => {
  const defaultValue = {
    number: 0,
    type: 0,
    area: 0,
    feet1: 0,
    inch1: 0,
    feet2: 0,
    inch2: 0,
    rate: 0,
    price: 0,
    // month: 0,
    // installment: 0,
    // advance: 0,
    // advamount: 0,
    feature: 0,
    total: 0,
  };
 
  

  const [form, setForm] = useState(defaultValue);

  useEffect(() => {
    if(isModalAdd==false){
    const dimension = updateData[3]?.toString().split("x");
    const updatedForm = {
      number: Number(updateData[0]), 
      type: updateData[1] === "Residential" ? 1 : updateData[1] === "Commercial" ? 2 : 0, 
      area: Number(updateData[2]?.toString().split(" ")[0]), 
      feet1: Number(dimension ? dimension[0]?.split(".")[0] : "0"), 
      inch1: Number(dimension ? dimension[0]?.split(".")[1] : "0"),
      feet2: Number(dimension ? dimension[1]?.split(".")[0] : "0"),
      inch2: Number(dimension ? dimension[1]?.split(".")[1] : "0"), 
      rate: Number(updateData[4]), 
      price: Number(updateData[5]), 
      feature: 0, 
      total: Number(updateData[6]), 
    };
    
    setForm(updatedForm);
    }
  }, [updateData]);
  useEffect(() => {
    setForm((prev) => {
      if (prev.rate != undefined && prev.area != undefined) {
        return {
          ...prev,
          price: prev.rate * prev.area,
        };
      }
      return prev;
    });
  }, [form.rate, form.area]);

  useEffect(() => {
    setForm((prev) => {
      return {
        ...prev,
        total:
          prev.feature == 1
            ? prev.price + prev.price * 0.1
            : prev.feature == 2
              ? prev.price + prev.price * 0.05
              : prev.price,
      };
    });
  }, [form.price, form.feature]);

  useEffect(() => {
    setForm((prev) => {
      return {
        ...prev,
        rate: prev.type == 1 ? 120000 : prev.rate,
      };
    });
  }, [form.type]);

  function setFormValue(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.name == "type" ||
          e.target.name == "installment" ||
          e.target.name == "feature"
            ? Number(e.target.value)
            : e.target.value,
      };
    });
  }
  const handleSubmit = () => {
    if (isModalAdd == true) {
      console.log("Add");
    } else {
      console.log(updateData);
      console.log("Update");
    }
    onClose();
    setForm(() => defaultValue);
  };
  return (
    <div>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card className="flex h-[75vh] w-full flex-col overflow-y-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Plot Menu</CardTitle>
          </CardHeader>
          <CardContent className="flex w-auto flex-col flex-wrap p-5">
            <div className="flex items-center justify-evenly gap-2">
              <div>
                <p>Plot #</p>
                <input
                  placeholder="231"
                  name="number"
                  type="text"
                  value={form.number}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
              <div>
                <p>Plot Type</p>
                <select
                  name="type"
                  value={form.type}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                >
                  <option value={0}>Select Type</option>
                  <option value={1}>Residential</option>
                  <option value={2}>Commercial</option>
                </select>
              </div>
              <div>
                <p>Area(Marla)</p>
                <input
                  placeholder="20"
                  type="text"
                  name="area"
                  value={form.area}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-5 flex items-center justify-around gap-10">
              <div>
                <h3>Width</h3>
              </div>
              <div>
                <h3>X</h3>
              </div>
              <div>
                <h3>Height</h3>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-around gap-10">
              <div>
                <p>Feets</p>
                <input
                  placeholder="30"
                  type="text"
                  name="feet1"
                  value={form.feet1}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
              <div>
                <p>Inches</p>
                <input
                  placeholder="6"
                  type="text"
                  name="inch1"
                  value={form.inch1}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
              <div>
                <p>Feets</p>
                <input
                  placeholder="50"
                  type="text"
                  name="feet2"
                  value={form.feet2}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
              <div>
                <p>Inches</p>
                <input
                  placeholder="2"
                  type="text"
                  name="inch2"
                  value={form.inch2}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-16">
              <div>
                <p>Rate Per Marla</p>
                <input
                  placeholder="0"
                  type="text"
                  disabled={form.type == 1 ? true : false}
                  name="rate"
                  value={form.rate}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
              <div>
                <p>Price</p>
                <input
                  placeholder="0"
                  type="text"
                  disabled
                  name="price"
                  value={form.price}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div>
            {/* <div className="mt-5 flex items-center gap-16">
              <div>
                <p>Number of Months</p>
                <input
                  placeholder="6"
                  type="text"
                  name="month"
                  value={form.month}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
              <div>
                <p>Installment Type</p>
                <select
                  name="installment"
                  value={form.installment}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                >
                  <option value={0}>Select the Desired Type</option>
                  <option value={1}>Monthly</option>
                  <option value={2}>3 Months</option>
                  <option value={3}>Half Year</option>
                  <option value={4}>Yearly</option>
                </select>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-16">
              <div>
                <p>Advance %</p>
                <input
                  type="text"
                  name="advance"
                  value={form.advance}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
              <div>
                <p>Advance Amount</p>
                <input
                  type="text"
                  name="advamount"
                  value={form.advamount}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                />
              </div>
            </div> */}
            <div className="mt-5 flex items-center gap-16">
              <div>
                <p>Feature</p>
                <select
                  name="feature"
                  value={form.feature}
                  onChange={setFormValue}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                >
                  <option value={0}>Select the Feature Type</option>
                  <option value={1}>Front</option>
                  <option value={2}>Back</option>
                </select>
              </div>
              <div className="">
                <p>Total Price</p>
                <input
                  type="text"
                  disabled
                  name="total"
                  value={form.total}
                  onChange={setFormValue}
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
                  setForm(() => defaultValue);
                }}
              >
                Exit
              </button>
            </div>
          </CardContent>
        </Card>
      </Backdrop>
    </div>
  );
};

export default AddPlot;
