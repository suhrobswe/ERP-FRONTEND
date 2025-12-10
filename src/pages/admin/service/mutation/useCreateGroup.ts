import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";
import type { GroupField } from "../../type";

export const useCreateGroup = () => {
    return useMutation({
        mutationFn: (data: GroupField) =>
            request.post("/group", data).then((res) => res.data),
    });
};
