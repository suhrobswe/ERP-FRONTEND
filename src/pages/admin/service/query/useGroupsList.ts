import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export function useGroupsList<T>() {
    return useQuery<T>({
        queryKey: ["groups"],
        queryFn: () => request.get("/group").then((res) => res.data),
    });
}
