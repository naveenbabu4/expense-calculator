import { createAction } from "@reduxjs/toolkit";


export type initialExpense = {
    name : string,
    expenseType : string,
    amount : Number,
    date: string,
    id: string
}

export const setInitialExpense = createAction<initialExpense>('setInitialExpense');