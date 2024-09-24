import React, { useEffect, useState } from 'react'
import { Expense } from '../../models/expense'
import { useGetAmountQuery, useGetTotalAmountQuery, useSubmitExpenseMutation } from '../../store/features/api/apiSlice';
import { submitReturnParams } from '../../store/features/api/submitExpense/submitExpense';
import { store } from '../../store/app/store';
import Expenses from '../Expenses/expenses';
import { setExpenseAction, useGetExpense } from '../../store/features/appStateSlice/appStateSlice';
const Home = () => {
  const initialExpenseState = {
    name: '',
    expenseType: '',
    amount: 0,
    date: new Date(Date.now()).toISOString().split('T')[0],
    id: ''
  };
  const [expense, setExpense] = useState<Expense>(initialExpenseState);
  const [submitExpense] = useSubmitExpenseMutation();
  const { data: amountData, error: amountError, isLoading: isAmountLoading, refetch: refetchAmountData } = useGetAmountQuery('');
  const { data: totalAmountData, error: totalAmountError, isLoading: isTotalAmountLoading, refetch: refetchTotalAmountData } = useGetTotalAmountQuery('');
  const handleChange = (event: any) => {
    const { name, value } = event.target
    setExpense((pValue) => {
      return {
        ...pValue,
        [name]: name === "amount" ? parseFloat(value) || 0 : value
      }
    })
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    expense.amount = expense.amount as Number;
    expense.date = expense.date.toLocaleString();

    const params: submitReturnParams = {
      postBody: expense
    };

    console.log(expense);

    try {
      // Submit expense and wait for the response
      await submitExpense(params).unwrap();

      // Refetch amount and total amount data
      refetchAmountData();
      refetchTotalAmountData();
      store.dispatch(setExpenseAction(expense))
      // Reset the expense state
      setExpense(initialExpenseState);
    } catch (error) {
      console.error("Failed to submit expense:", error);
    }
  }
  
  return (
    <>
      <h1 className='p-10 text-4xl text-center text-[#EEEEEE] font-bold'>Add Expense</h1>
      <div className="w-1/3 bg-[#393E46] m-auto rounded-[1.8rem]">
        <form className="py-12 m-auto w-2/3 flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-[#EEEEEE] font-semibold mb-2">
              Expense Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={expense.name}
              className="p-2 rounded-md border border-gray-400 bg-[#EEEEEE] text-black focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              placeholder="Enter Expense Name" onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="amount" className="text-[#EEEEEE] font-semibold mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={expense.amount.toString()}
              className="p-2 rounded-md border border-gray-400 bg-[#EEEEEE] text-black focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              placeholder="Enter amount" onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="expenseType" className="text-[#EEEEEE] font-semibold mb-2">
              Expense Type
            </label>
            <select
              id="expenseType"
              name="expenseType"
              value={expense.expenseType}
              className="p-2 rounded-md border border-gray-400 bg-[#EEEEEE] text-black focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
              onChange={handleChange}
            >
              <option value="">Select an expense type</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="utilities">Utilities</option>
              <option value="entertainment">Entertainment</option>
              <option value="others">Others</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-[#00ADB5] text-[#EEEEEE] font-bold rounded-md hover:bg-[#00A1A8] focus:outline-none focus:ring-2 focus:ring-[#00ADB5]"
            onClick={handleSubmit}
          >
            Add Expense
          </button>
        </form>
        <div className='pb-10 ml-[5rem] flex flex-col justify-center'>
          <h1 className='text-[#00ADB5] font-semibold text-[1.3rem]'>Balance Amount: <span className='text-[#EEEEEE] font-normal'>{amountData?.totalAmount.toString()}</span></h1>
          <h1 className='text-[#00ADB5] font-semibold text-[1.3rem]'>Total Amount: <span className='text-[#EEEEEE] font-normal'>{totalAmountData?.totalAmount.toString()}</span></h1>
        </div>
      </div>
      <Expenses />
    </>
  )
}

export default Home