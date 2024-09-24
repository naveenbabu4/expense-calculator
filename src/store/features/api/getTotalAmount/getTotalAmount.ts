import { AppEndPointBuilder } from "../apiSlice";
import { Amount } from "../../../../models/amount";

export const getTotalAmountAPI = () => ({
    url:'/gettotalamount',method:'GET'
})

export const getTotalAmountBuilder = (builder:AppEndPointBuilder) => builder.query<Amount,''>({
    query: () => {
        const {url,method} = getTotalAmountAPI();
        return {url,method}
    }
})