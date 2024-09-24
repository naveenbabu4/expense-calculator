import React from 'react'
import { useGetAllExpensesQuery } from '../../store/features/api/apiSlice'

const Expenses = () => {
    const { data: expenseData, error: expenseError, isLoading: isExpenseLoading } = useGetAllExpensesQuery("");
    return (
        <>
      <div className='p-10 pt-[6rem]'>
        <table className='m-auto w-3/4 border-collapse border border-[#00ADB5] text-[#EEEEEE]'>
          <thead className='bg-[#1a202c]'>
            <tr>
              <th className='border border-[#00ADB5] px-4 py-2'>Expense Name</th>
              <th className='border border-[#00ADB5] px-4 py-2'>Expense Amount</th>
              <th className='border border-[#00ADB5] px-4 py-2'>Expense Type</th>
            </tr>
          </thead>
          <tbody>
            {expenseData?.map((expense) => (
              <tr key={expense.id} className='bg-[#2d3748]'>
                <td className='border border-[#00ADB5] px-4 py-2'>{expense.name}</td>
                <td className='border border-[#00ADB5] px-4 py-2'>{expense.amount.toString()}</td>
                <td className='border border-[#00ADB5] px-4 py-2'>{expense.expenseType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
    )
}

export default Expenses