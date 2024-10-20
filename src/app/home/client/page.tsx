"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import PageHeader from "~/components/PageHeader";
import { MdLandscape } from "react-icons/md";
import AppTable from "~/components/Table";
import { FaPlus, FaPrint } from "react-icons/fa";
import { useState } from "react";
import AddClient from "~/components/AddClient";
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
      "Purchaser",
      "Mudassir",
      "34032-123123123-1",
      "03107206547",
      "Layyah",
    ],
    [
      "1",
      "Purchaser",
      "Mudassir",
      "34032-123123123-1",
      "03107206547",
      "Layyah",
    ],
    [
      "1",
      "Purchaser",
      "Mudassir",
      "34032-123123123-1",
      "03107206547",
      "Layyah",
    ],
    [
      "1",
      "Purchaser",
      "Mudassir",
      "34032-123123123-1",
      "03107206547",
      "Layyah",
    ],
    [
      "1",
      "Purchaser",
      "Mudassir",
      "34032-123123123-1",
      "03107206547",
      "Layyah",
    ],
  ];
  const headers = ["No.", "Type", "Name", "CNIC", "Address"];
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

  const onClose = () => {
    setIsOpen(false);
  };

  const openBackdrop = () => {
    setIsOpen(true);
  };

  return (
    <>
      <AddClient isOpen={isOpen} onClose={onClose} setIsOpen={setIsOpen} />
      <div>
        <div className="flex w-full flex-col gap-5">
          <Card>
            <CardHeader>
              <PageHeader
                icon={<MdLandscape className="text-4xl" />}
                title="Clients"
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
                      Add Client
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
