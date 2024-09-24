import { AppEndPointBuilder } from "../apiSlice";
import { Expense } from "../../../../models/expense";

export const getAllExpensesAPI = () => ({
    url:'/getallexpenses',method:'GET'
});

export const getAllExpensesBuilder = (builder:AppEndPointBuilder) => builder.query<Expense[],''>(
    {
        query: () => {
            const {url,method} = getAllExpensesAPI();
            return {url,method}
        }
    }
)