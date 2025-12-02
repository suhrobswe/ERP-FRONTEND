import { useQuery } from "@tanstack/react-query";
import type { SpecificationResponse } from "../../type";
import { request } from "@/config/request";

export const useSpecification = () => {
    return useQuery<SpecificationResponse>({
        queryKey: ["spec_list"],
        queryFn: () => request.get("/specification").then((res) => res.data),
    });
};
