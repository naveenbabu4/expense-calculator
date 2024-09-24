import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { submitExpenseBuilder } from "./submitExpense/submitExpense";
import { getExpensesBuilder } from "./getExpense/getExpense";
import { getAmountBuilder } from "./getAmount/getAmount";
import { getTotalAmountBuilder } from "./getTotalAmount/getTotalAmount";
import { getAllExpensesBuilder } from "./getAllExpenses/getAllExpenses";

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    webApi,
    extraOptions
) => {
    const baseUrl = 'http://localhost:4002/v1';
    const rawBaseQuery = await retry(fetchBaseQuery({
        baseUrl,
    }),{
        maxRetries:2
    });
    return rawBaseQuery(args,webApi,extraOptions);
};

export type AppEndPointBuilder = EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, {}>, never, 'api'>;

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: dynamicBaseQuery,
    keepUnusedDataFor: 9999,
    endpoints: (builder) =>({
        submitExpense: submitExpenseBuilder(builder),
        getExpenses: getExpensesBuilder(builder),
        getAmount:getAmountBuilder(builder),
        getTotalAmount:getTotalAmountBuilder(builder),
        getAllExpenses:getAllExpensesBuilder(builder)
    })
});

export const {
    useSubmitExpenseMutation,
    useGetExpensesQuery,
    useGetAmountQuery,
    useGetTotalAmountQuery,
    useGetAllExpensesQuery
} = apiSlice