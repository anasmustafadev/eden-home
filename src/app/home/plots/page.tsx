"use client";
import React, { useEffect } from "react";
import type { ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import PageHeader from "~/components/PageHeader";
import { MdLandscape } from "react-icons/md";
import AppTable from "~/components/Table";
import { FaPlus, FaPrint } from "react-icons/fa";
import { useState } from "react";
import Backdrop from "~/components/Backdrop";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { IoMdMenu } from "react-icons/io";
import { type plotType } from "~/types/plotType";

const Page = () => {
  const [plots, setPlots] = useState<plotType[]>([]);
  const getPlots = async (): Promise<plotType[]> => {
    const response = await axios.get("/api/plots");
    return response.data as plotType[];
  };
  useEffect(() => {
    getPlots()
      .then((data) => setPlots(data))
      .catch((error) => {
        console.error("Failed to fetch clients:", error);
      });
  }, []);
  const transformPlotData = (plots: plotType[]) => {
    return plots.map((plot) => [
      plot.plotId.toString(), // No.
      plot.type === 1 ? "Commercial" : "Residential", // Plot Type
      `${plot.area} Marla`, // Area
      `${plot.width}x${plot.height}`, // Size
      plot.ratePerMarla.toString(), // Rate
      plot.price ? plot.price.toString() : "0", // Amount
      plot.total ? plot.total.toString() : "0",
    ]);
  };
  const plotData = transformPlotData(plots);

  const headers = [
    "No.",
    "Plot",
    "Area",
    "Size",
    "Rate",
    "Amount",
    "Total Amount",
  ];
  const buttons = plotData.map(() => [
    {
      label: "Update",
      className:
        "border-2 border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out",
      actionType: "DETAIL",
      onClick: () => openBackdrop(),
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

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
    month: 0,
    installment: 0,
    advance: 0,
    advamount: 0,
    feature: 0,
    total: 0,
  };

  const [form, setForm] = useState(defaultValue);

  const onClose = () => {
    setForm(() => defaultValue);
    setIsOpen(false);
  };

  const openBackdrop = () => {
    setIsOpen(true);
  };

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

  return (
    <>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card className="flex h-[90vh] w-full flex-col overflow-y-auto">
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
                <p>Area</p>
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
            <div className="mt-5 flex items-center gap-16">
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
            </div>
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
                onClick={() => setIsOpen(false)}
              >
                Save
              </button>
              <button
                className="rounded-lg border-2 border-red-500 px-4 py-2 font-semibold text-red-500 transition-colors duration-300 ease-in-out hover:bg-red-500 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Exit
              </button>
            </div>
          </CardContent>
        </Card>
      </Backdrop>

      <div>
        <div className="flex w-full flex-col gap-5">
          <Card>
            <CardHeader>
              <PageHeader
                icon={<MdLandscape className="text-4xl" />}
                title="Plots"
              />
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>Details</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-md p-2 hover:bg-gray-200">
                      <IoMdMenu className="text-2xl" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-40 rounded-lg border border-gray-200 bg-white shadow-md"
                    align="end"
                  >
                    <DropdownMenuLabel className="px-4 py-2 font-bold text-gray-700">
                      Actions
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-1 border-t" />

                    <DropdownMenuItem
                      onClick={() => openBackdrop()}
                      className="flex items-center rounded px-4 py-2 hover:opacity-90"
                    >
                      <FaPlus className="mr-2" />
                      Add Plot
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex items-center rounded px-4 py-2 hover:bg-blue-700">
                      <FaPrint className="mr-2" />
                      Print
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="flex gap-2">
              <AppTable data={plotData} headers={headers} buttons={buttons} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
