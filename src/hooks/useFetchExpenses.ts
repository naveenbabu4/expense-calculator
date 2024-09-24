import { apiSlice } from "../store/features/api/apiSlice";

export const useFetchExpenses = () => {
    const [fetchRequest] = apiSlice.endpoints.getExpenses.useLazyQuery();
    return () => fetchRequest('').unwrap();
}