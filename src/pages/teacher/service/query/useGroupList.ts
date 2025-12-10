import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useGroupList = () => {
    return useQuery({
        queryKey: ["groupList"],
        queryFn: () =>
            request.get("/group/for-teacher").then((res) => res.data),
    });
};
