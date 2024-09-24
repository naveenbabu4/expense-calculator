import React, { useEffect, useState } from 'react'
import { Expense } from '../models/expense'
import { useFetchExpenses } from '../hooks/useFetchExpenses'
const Sample = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const fetchExpenses = useFetchExpenses(); 
    useEffect(() => {
        const fetchData = async () => {
            const fetchedExpenses = await fetchExpenses();
            setExpenses(fetchedExpenses);
        };

        fetchData();
    }, []);
    console.log(expenses);

    return (
        <>
            {expenses.length > 0 ? (
                expenses.map((ele) => (
                    <div key={ele.id}>
                        <h1 className='text-[3rem]'>{ele.amount.toString()}</h1>
                        <h1 className='text-[3rem]'>{ele.name}</h1>
                    </div>
                ))
            ) : (
                <h1 className='text-[3rem]'>Hello</h1>
            )}
        </>
    )
}

export default Sample