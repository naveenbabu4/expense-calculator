import { AppEndPointBuilder } from "../apiSlice";

import { Amount } from "../../../../models/amount";

export const getAmountAPI = ()=> ({
    url:'/getAmount', method:'GET'
})

export const getAmountBuilder = (builder:AppEndPointBuilder) => builder.query<Amount,''>(
    {
        query: () => {
            const {url,method} = getAmountAPI();
            return {url,method}
        }
    }
)
