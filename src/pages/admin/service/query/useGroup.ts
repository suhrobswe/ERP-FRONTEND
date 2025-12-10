import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";
import type { IGroup } from "../../type";

export const useGroup = (id?: string) => {
    return useQuery({
        queryKey: ["groupById"],
        queryFn: () => {
            return request
                .get<IGroup>(`/group/for-admin/${id}`)
                .then((res) => res.data);
        },
    });
};
