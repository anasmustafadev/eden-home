"use client";

import React, { type ChangeEvent } from "react";
import { IoIosPerson } from "react-icons/io";
import { Card, CardHeader } from "~/components/ui/card";
import PageHeader from "~/components/PageHeader";
import { FaSave, FaPlus } from "react-icons/fa";
import AppTable from "~/components/Table";
import { useState } from "react";
import Backdrop from "~/components/Backdrop";

const Page = () => {
  const [userData, setUserData] = useState([
    ["1", "Anas Mustafa", "0343123123", "Lahore", "ANAS", "********"],
    ["2", "Mudassir", "0343126153", "Lahore", "MUDASSIR", "********"],
    ["3", "AbdulRehman", "0325673123", "Lahore", "ABDULREHMAN", "********"],
    ["", "", "", "", "", ""],
  ]);

  const headers = [
    "No.",
    "Name",
    "Phone Number",
    "Address",
    "Admin",
    "Password",
  ];

  const buttons = userData.map((i, k) => [
    {
      label: "Update",
      className: "bg-blue-500 text-white px-3 py-2 rounded mr-1",
      actionType: "UPDATE",
      data: ["", ""],
      onClick: () => {
        openBackdrop(k);
      },
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // const onClose = () => {
  //   setIsOpen(false);
  // };

  // const openBackdrop = (index: number) => {
  //   console.log("Hello");
  //   setIndex(index);
  //   setIsOpen(true);
  // };
  
  const [heading,setHeading]=useState("");

  const defaultValue = {
    name: "",
    phone: "",
    address: "",
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(defaultValue);

  const [profileData, setProfileData] = useState(defaultValue);
  const handleChangeProfile = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  // Function to close modal
  const onClose = () => {
    setFormData(() => defaultValue);
    setIsOpen(false);
  };

  // Function to open modal and load user data for editing
  const openBackdrop = (idx: number) => {
    setIndex(idx);
    if (userData[idx] != undefined) {
      setFormData({
        name: userData[idx][1] ?? "",
        phone: userData[idx][2] ?? "",
        address: userData[idx][3] ?? "",
        username: userData[idx][4] ?? "",
        password: userData[idx][5] ?? "",
      });
    }
    setIsOpen(true);
  };

  // Handle form changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.name == "Hello") handleSubmit(); // Only for linting purpose. To be removed later.
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    const updatedData = [...userData];
    if (userData[index] != undefined) {
      updatedData[index] = [
        userData[index][0] ?? "",
        formData.name,
        formData.phone,
        formData.address,
        formData.username,
        formData.password,
      ];
    }
    setUserData(updatedData);
    onClose();
  };

  return (
    <>
      <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card>
          <div className="w-[30rem] h-[90vh] p-5 overflow-y-auto">
            <h1 className="text-3xl text-gray-800 p-2">{heading==""?"Update User Details":heading}</h1>
            <div className="flex flex-col gap-4">
              <div>
                <p>Name:</p>
                <input
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div>
                <p>Contact:</p>
                <input
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="text"
                  placeholder="Contact"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                />
              </div>
              <div>
                <p>Address</p>
                <input
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>
              <div>
                <p>Username:</p>
                <input
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>
              <div>
                <p>Password:</p>
                <input
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
            </div>
            <div className="mt-5 flex justify-between">
              <button
                className="rounded bg-blue-500 px-3 py-2"
                onClick={() =>{ setIsOpen(false)
                  setHeading("");
                }}
              >
                Save
              </button>
              <button
                className="rounded bg-red-500 px-3 py-2"
                onClick={() => {
                  setIsOpen(false);
                  setHeading("");
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

      <div>
        <div className="flex w-full flex-col gap-5">
          <Card>
            <CardHeader>
              <PageHeader
                icon={<IoIosPerson className="text-4xl" />}
                title="Profile"
              />
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <input
                    type="Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleChangeProfile}
                    className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    placeholder="Full Name"
                  />
                  <input
                    type="phone"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChangeProfile}
                    className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleChangeProfile}
                    className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    placeholder="Username"
                  />
                  <input
                    type="password"
                    name="password"
                    value={profileData.password}
                    onChange={handleChangeProfile}
                    className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleChangeProfile}
                  className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  placeholder="Address"
                />
              </div>
              <button className="mt-5 flex w-28 items-center rounded bg-green-500 px-4 py-2 text-white hover:opacity-90">
                <FaSave className="mr-2" />
                Save
              </button>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <h1 className="text-2xl">Users</h1>
              <AppTable
                data={userData}
                headers={headers}
                buttons={buttons}
                setUpdateData={() => console.log("To bo Implemented")}
              />
              <button
                onClick={() =>{ openBackdrop(3)
                  setHeading("Add User Details")
                }}
                className="mt-5 flex w-32 items-center rounded bg-blue-500 px-4 py-2 text-white hover:opacity-90"
              >
                <FaPlus className="mr-2" />
                Add User
              </button>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
