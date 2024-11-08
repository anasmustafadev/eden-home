import React,{useState} from 'react'
import { Card, CardHeader,CardTitle } from "~/components/ui/card";
import Backdrop from "~/components/Backdrop";
interface AddExpenseProps{
    isOpen:boolean,
    setIsOpen:(type:boolean)=>void
    onClose:()=>void
}
const AddExpense = ({isOpen,setIsOpen,onClose}:AddExpenseProps) => {
    const defaultValue = {
        date: "",
        amount:0,
        description:""
      };
      const [formData,setFormData]=useState(defaultValue);
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const handleSubmit = () => {
        // Handle form submission
        onClose();
        setFormData(defaultValue);
      };
  return (
    <div>
       <Backdrop isOpen={isOpen} onClose={onClose}>
        <Card>
          <div className="w-[30rem] p-5">
            <CardHeader className="flex">
              <CardTitle className="mx-auto mb-5 text-3xl">Add Expense</CardTitle>
            </CardHeader>
            <div>
              <p>Date</p>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <p>Amount</p>
              <input
                type="text"
                name='amount'
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <p>Description</p>
              <input
                type="text"
                name='description'
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
              />
            </div>
            <div className="mt-5 flex justify-between">
              <button
                className="rounded bg-blue-500 px-3 py-2"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="rounded bg-red-500 px-3 py-2"
                onClick={() =>{ setIsOpen(false);
                    setFormData(defaultValue);
                }}
              >
                Exit
              </button>
            </div>
          </div>
        </Card>
      </Backdrop>
    </div>
  )
}

export default AddExpense
