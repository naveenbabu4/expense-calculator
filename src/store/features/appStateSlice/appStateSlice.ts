import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Amount } from "../../../models/amount";
import { Expense } from "../../../models/expense";
import { apiSlice } from "../api/apiSlice";
import { useExpenseSelector } from "../../app/hooks";

export interface AppStateInterface {
    amount: Amount | null,
    expense: Expense | null
}

export const initialState: AppStateInterface = {
    amount: null,
    expense: null
}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setExpenseAction: (
            state: AppStateInterface,
            action: PayloadAction<Expense>
        ) => {
            state.expense = action.payload;
        },
        setAmountAction: (
            state: AppStateInterface,
            action: PayloadAction<Amount>
        ) => {
            state.amount = action.payload
        }
    }
})

export const {
    setAmountAction,
    setExpenseAction
} = appStateSlice.actions

export const useGetExpense = () => useExpenseSelector(
    (state) => state.appState.expense,
)
export default appStateSlice.reducer;