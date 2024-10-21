"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import PageHeader from "~/components/PageHeader";
import { MdLandscape } from "react-icons/md";
import AppTable from "~/components/Table";
import { FaPlus, FaPrint } from "react-icons/fa";
import { useState } from "react";
import AddPlot from "~/components/AddPlot";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { IoMdMenu } from "react-icons/io";

const Page = () => {
  const plotData = [
    [
      "1",
      "Shop Commercial",
      "1 Marla",
      "27x10",
      "2,000,000",
      "2,000,000",
      "4,000,000",
      "33,333.33",
      "48",
    ],
    [
      "2",
      "Shop Commercial",
      "1.5 Marla",
      "27x10",
      "400,000",
      "600,000",
      "120,000",
      "10,000",
      "48",
    ],
    [
      "3",
      "Plot Residential",
      "5 Marla",
      "50x27",
      "250,000",
      "1,250,000",
      "250,000",
      "20,833.33",
      "48",
    ],
    [
      "4",
      "Plot Residential",
      "6.67 Marla",
      "45x40",
      "250,000",
      "1,666,667",
      "333,333",
      "27,777.78",
      "48",
    ],
    ["5", "Plot Residential", "0 Marla", "30x50", "0", "0", "0", "0", "48"],
  ];
  const headers = [
    "No.",
    "Plot",
    "Area",
    "Size",
    "Rate",
    "Amount",
    "Advance",
    "Installment",
    "No of Installments",
  ];
  const buttons = plotData.map(() => [
    {
      label: "Update",
      className:
        "border-2 border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-300 ease-in-out",
      actionType: "DETAIL",
      onClick: () => {
        setIsModalAdd(false);
        openBackdrop();
      },
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalAdd, setIsModalAdd] = useState(true);
  const onClose = () => {
    setIsOpen(false);
  };

  const openBackdrop = () => {
    setIsOpen(true);
  };
  return (
    <>
      <AddPlot
        isOpen={isOpen}
        onClose={onClose}
        setIsOpen={setIsOpen}
        isModalAdd={isModalAdd}
      />
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
                      onClick={() => {
                        setIsModalAdd(true);
                        openBackdrop();
                      }}
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
