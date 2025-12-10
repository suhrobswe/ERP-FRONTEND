import { request } from "@/config/request";
import { useMutation } from "@tanstack/react-query";

export const useUpdateGroupStatus = (id: string) => {
    return useMutation({
        mutationFn: (isActive: boolean) =>
            request
                .patch(`/group/status/${id}`, { isActive })
                .then((res) => res.data),
    });
};
