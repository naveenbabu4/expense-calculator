import { AppEndPointBuilder } from "../apiSlice";

import { Expense } from "../../../../models/expense";


export const getExpensesAPI = () => ({
    url:`/getallexpenses`,method: 'GET'
})
export const getExpensesBuilder = (builder:AppEndPointBuilder) => builder
.query<Expense[],''>(
    {
        query: () => {
            const {url,method} = getExpensesAPI();
            return {url,method}
        }
    }
)