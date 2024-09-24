import type { AppEndPointBuilder } from "../apiSlice";

import type { Expense } from "../../../../models/expense";

export type submitReturnParams = {
    postBody: Expense;
};

export const submitExpenseBuilder = (builder:AppEndPointBuilder) => builder
.mutation<Expense,submitReturnParams>({
    query:({postBody}) => ({
        body: postBody,
        method: 'POST',
        url: '/create',
    })
});