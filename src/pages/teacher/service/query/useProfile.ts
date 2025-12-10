import { request } from "@/config/request";
import { useQuery } from "@tanstack/react-query";

export const useProfile = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: () => request.get("/teacher/details").then((res) => res.data),
    });
};
